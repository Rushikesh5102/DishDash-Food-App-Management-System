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
exports.searchProduct = exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.createProduct = exports.getProducts = void 0;
const scraper_service_1 = require("../services/scraper.service");
const Price_1 = __importDefault(require("../models/Price"));
const Product_1 = __importDefault(require("../models/Product"));
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.findAll();
        res.json(products);
    }
    catch (error) {
        next(error);
    }
});
exports.getProducts = getProducts;
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.create(req.body);
        res.status(201).json(product);
    }
    catch (error) {
        next(error);
    }
});
exports.createProduct = createProduct;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    }
    catch (error) {
        next(error);
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [updated] = yield Product_1.default.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedProduct = yield Product_1.default.findByPk(req.params.id);
            return res.json(updatedProduct);
        }
        res.status(404).json({ message: 'Product not found' });
    }
    catch (error) {
        next(error);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield Product_1.default.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            return res.status(204).send();
        }
        res.status(404).json({ message: 'Product not found' });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteProduct = deleteProduct;
const searchProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productName } = req.body;
    if (!productName) {
        return res.status(400).json({ message: 'Product name is required.' });
    }
    try {
        // Find or create the product
        const [product] = yield Product_1.default.findOrCreate({
            where: { name: productName },
            defaults: { name: productName }, // Add other defaults like description, imageUrl if applicable
        });
        // Fetch prices from the scraper service
        const fetchedPrices = yield (0, scraper_service_1.fetchPrices)(productName);
        // Save fetched prices to the database
        const createdPrices = yield Promise.all(fetchedPrices.map((item) => Price_1.default.create({
            productId: product.id,
            platform: item.platform,
            price: item.price,
            timestamp: new Date(),
        })));
        res.status(201).json(createdPrices);
    }
    catch (error) {
        console.error('Error in searchProduct:', error);
        if (error.message.includes('Scraper Unavailable')) {
            return res.status(503).json({ message: error.message });
        }
        next(error);
    }
});
exports.searchProduct = searchProduct;
