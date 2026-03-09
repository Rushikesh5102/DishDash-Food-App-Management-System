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
exports.compareProductByName = exports.compareByRestaurant = exports.compareSearch = exports.addPlatformListing = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const sequelize_1 = require("sequelize");
const product_model_1 = __importDefault(require("../models/product.model"));
const platform_model_1 = __importDefault(require("../models/platform.model"));
const platformListing_model_1 = __importDefault(require("../models/platformListing.model"));
const restaurant_model_1 = require("../models/restaurant.model");
/* =========================
   CREATE PRODUCT
========================= */
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, category, restaurantId, imageUrl } = req.body;
        const product = yield product_model_1.default.create({
            name,
            category,
            restaurantId,
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
   SEARCH + COMPARE (Enhanced with Restaurant info)
========================= */
const compareSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
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
            include: [
                {
                    model: restaurant_model_1.Restaurant,
                    attributes: ['id', 'name', 'cuisineType', 'location'],
                },
            ],
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
            var _a, _b;
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
                productName: foundProduct.name,
                productImage: foundProduct.imageUrl,
                restaurantName: ((_a = foundProduct.Restaurant) === null || _a === void 0 ? void 0 : _a.name) || 'Unknown',
                restaurantCuisine: ((_b = foundProduct.Restaurant) === null || _b === void 0 ? void 0 : _b.cuisineType) || 'Unknown',
                platform: listing.Platform.name,
                platformLogo: listing.Platform.logoUrl,
                basePrice,
                deliveryFee,
                discount,
                finalPrice,
                etaMinutes: listing.etaMinutes,
                redirectUrl: listing.redirectUrl,
                discountType: listing.discountType,
                rating: listing.rating || 0,
            };
        });
        const cheapest = comparisons.reduce((min, curr) => curr.finalPrice < min.finalPrice ? curr : min);
        const fastestDelivery = comparisons.reduce((fastest, curr) => curr.etaMinutes < fastest.etaMinutes ? curr : fastest);
        res.json({
            product: foundProduct.name,
            restaurant: {
                id: foundProduct.restaurantId,
                name: ((_a = foundProduct.Restaurant) === null || _a === void 0 ? void 0 : _a.name) || 'Unknown',
                cuisine: ((_b = foundProduct.Restaurant) === null || _b === void 0 ? void 0 : _b.cuisineType) || 'Unknown',
                address: ((_c = foundProduct.Restaurant) === null || _c === void 0 ? void 0 : _c.location) || 'Unknown',
            },
            comparisons,
            cheapest,
            fastestDelivery,
        });
    }
    catch (error) {
        console.error('Comparison error:', error);
        console.error('Error details:', {
            message: error === null || error === void 0 ? void 0 : error.message,
            stack: error === null || error === void 0 ? void 0 : error.stack,
        });
        res.status(500).json({
            message: 'Error comparing prices',
            error: error === null || error === void 0 ? void 0 : error.message
        });
    }
});
exports.compareSearch = compareSearch;
/* =========================
   COMPARE BY RESTAURANT
   Returns prices organized by restaurant
========================= */
const compareByRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { restaurantId } = req.params;
        if (!restaurantId) {
            return res.status(400).json({ message: 'Restaurant ID required' });
        }
        const restaurant = yield restaurant_model_1.Restaurant.findByPk(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        // Get all products from this restaurant
        const products = yield product_model_1.default.findAll({
            where: { restaurantId },
        });
        if (!products.length) {
            return res.status(404).json({ message: 'No products found for this restaurant' });
        }
        const allComparisons = [];
        for (const prod of products) {
            const listings = yield platformListing_model_1.default.findAll({
                where: { productId: prod.id },
                include: [{ model: platform_model_1.default }],
            });
            if (listings.length > 0) {
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
                        productId: prod.id,
                        productName: prod.name,
                        productImage: prod.imageUrl,
                        platform: listing.Platform.name,
                        platformLogo: listing.Platform.logoUrl,
                        basePrice,
                        deliveryFee,
                        discount,
                        finalPrice,
                        etaMinutes: listing.etaMinutes,
                        redirectUrl: listing.redirectUrl,
                        rating: listing.rating || 0,
                    };
                });
                allComparisons.push(...comparisons);
            }
        }
        // Sort by final price for easier comparison
        const sortedByPrice = [...allComparisons].sort((a, b) => a.finalPrice - b.finalPrice);
        res.json({
            restaurant: {
                id: restaurant.id,
                name: restaurant.name,
                cuisine: restaurant.cuisineType || 'Unknown',
                address: restaurant.location || 'Unknown',
            },
            productCount: products.length,
            comparisonCount: allComparisons.length,
            comparisons: sortedByPrice,
        });
    }
    catch (error) {
        console.error('Restaurant comparison error:', error);
        res.status(500).json({
            message: 'Error comparing restaurant prices',
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.compareByRestaurant = compareByRestaurant;
/* =========================
   COMPARE PRODUCT BY NAME (SEARCH)
========================= */
const compareProductByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product } = req.query;
        if (!product || typeof product !== 'string') {
            return res.status(400).json({ message: 'Product name is required' });
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
                productName: foundProduct.name,
                productImage: foundProduct.imageUrl,
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
        console.error('Error details:', {
            message: error === null || error === void 0 ? void 0 : error.message,
            stack: error === null || error === void 0 ? void 0 : error.stack,
        });
        res.status(500).json({
            message: 'Error comparing prices',
            error: error === null || error === void 0 ? void 0 : error.message
        });
    }
});
exports.compareProductByName = compareProductByName;
