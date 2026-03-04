"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareSearch = exports.addPlatformListing = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const sequelize_1 = require("sequelize");
const product_model_1 = __importDefault(require("../models/product.model"));
const platform_model_1 = __importDefault(require("../models/platform.model"));
const platformListing_model_1 = __importDefault(require("../models/platformListing.model"));
/* =========================
   CREATE PRODUCT
========================= */
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, category, restaurantName, imageUrl } = req.body;
        const product = yield product_model_1.default.create({
            name,
            category,
            restaurantName,
            imageUrl,
        });
        res.status(201).json(product);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating product' });
    }
});
exports.createProduct = createProduct;
/* =========================
   GET ALL PRODUCTS
========================= */
const getProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.findAll();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
});
exports.getProducts = getProducts;
/* =========================
   GET PRODUCT BY ID
========================= */
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching product' });
    }
});
exports.getProductById = getProductById;
/* =========================
   ADD PLATFORM LISTING
========================= */
const addPlatformListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, platformId, price, deliveryFee, discountType, discountValue, etaMinutes, redirectUrl, } = req.body;
        const listing = yield platformListing_model_1.default.create({
            productId,
            platformId,
            price,
            deliveryFee,
            discountType,
            discountValue,
            etaMinutes,
            redirectUrl,
        });
        res.status(201).json(listing);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding listing' });
    }
});
exports.addPlatformListing = addPlatformListing;
/* =========================
   SEARCH + COMPARE
========================= */
const compareSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product } = req.query;
        if (!product) {
            return res.status(400).json({ message: 'Product query required' });
        }
        // ✅ Correct column name is "name"
        const foundProduct = yield product_model_1.default.findOne({
            where: {
                name: {
                    [sequelize_1.Op.like]: `%${product}%`,
                },
            },
        });
        if (!foundProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const listings = yield platformListing_model_1.default.findAll({
            where: { productId: foundProduct.id },
            include: [{ model: platform_model_1.default }],
        });
        if (!listings.length) {
            return res.status(404).json({ message: 'No listings found' });
        }
        const comparisons = listings.map((listing) => {
            const basePrice = parseFloat(listing.price);
            const deliveryFee = parseFloat(listing.deliveryFee || 0);
            const discountValue = parseFloat(listing.discountValue || 0);
            let discount = 0;
            if (listing.discountType === 'percentage') {
                discount = (basePrice * discountValue) / 100;
            }
            else if (listing.discountType === 'flat') {
                discount = discountValue;
            }
            const finalPrice = basePrice + deliveryFee - discount;
            return {
                platform: listing.Platform.name,
                basePrice,
                deliveryFee,
                discount,
                finalPrice,
                etaMinutes: listing.etaMinutes,
                redirectUrl: listing.redirectUrl,
            };
        });
        const cheapest = comparisons.reduce((min, curr) => curr.finalPrice < min.finalPrice ? curr : min);
        res.json({
            product: foundProduct.name,
            comparisons,
            cheapest,
        });
    }
    catch (error) {
        console.error('Comparison error:', error);
        res.status(500).json({ message: 'Error comparing prices' });
    }
});
exports.compareSearch = compareSearch;
