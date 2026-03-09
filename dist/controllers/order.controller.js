"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.getOrderStats = exports.getUserOrderHistory = exports.deleteOrder = exports.updateOrderStatus = exports.getOrderById = exports.getOrders = exports.createOrder = void 0;
const sequelize_1 = require("sequelize");
const orderService = __importStar(require("../services/order.service"));
const order_model_1 = require("../models/order.model");
const product_model_1 = __importDefault(require("../models/product.model"));
const platform_model_1 = __importDefault(require("../models/platform.model"));
const restaurant_model_1 = require("../models/restaurant.model");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { productId, platformId, restaurantId, platformName, restaurantName, productName, price, deliveryFee, totalPrice, discount, notes, } = req.body;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }
        if (!productId || !platformId || !totalPrice) {
            return res.status(400).json({
                success: false,
                message: 'Product ID, Platform ID, and Total Price are required',
            });
        }
        const order = yield order_model_1.Order.create({
            userId,
            productId,
            platformId,
            restaurantId,
            platformName,
            restaurantName,
            productName,
            price,
            deliveryFee,
            totalPrice,
            discount,
            status: 'confirmed',
            orderDate: new Date(),
            notes,
        });
        return res.status(201).json({ success: true, message: 'Order created successfully', order });
    }
    catch (error) {
        console.error('Create order error:', error);
        return res.status(500).json({ success: false, message: 'Error creating order', error: error.message });
    }
});
exports.createOrder = createOrder;
const getOrders = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderService.getOrders();
        res.json(orders);
    }
    catch (error) {
        next(error);
    }
});
exports.getOrders = getOrders;
const getOrderById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orderService.getOrderById(req.params.id);
        if (order) {
            res.json(order);
        }
        else {
            res.status(404).json({ message: 'Order not found' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getOrderById = getOrderById;
const updateOrderStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orderService.updateOrderStatus(req.params.id, req.body.status);
        if (order) {
            res.json(order);
        }
        else {
            res.status(404).json({ message: 'Order not found' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateOrderStatus = updateOrderStatus;
const deleteOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield orderService.deleteOrder(req.params.id);
        if (deleted) {
            res.json({ message: 'Order deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Order not found' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteOrder = deleteOrder;
const getUserOrderHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { status, limit = 10, offset = 0 } = req.query;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }
        const whereClause = { userId };
        if (status)
            whereClause.status = status;
        const parsedLimit = parseInt(String(limit), 10);
        const parsedOffset = parseInt(String(offset), 10);
        const { rows: orders, count } = yield order_model_1.Order.findAndCountAll({
            where: whereClause,
            include: [product_model_1.default, platform_model_1.default, restaurant_model_1.Restaurant],
            order: [['orderDate', 'DESC']],
            offset: parsedOffset,
            limit: parsedLimit,
        });
        return res.status(200).json({ success: true, count, orders });
    }
    catch (error) {
        console.error('Get user order history error:', error);
        return res.status(500).json({ success: false, message: 'Error fetching order history', error: error.message });
    }
});
exports.getUserOrderHistory = getUserOrderHistory;
const getOrderStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }
        const byStatusRaw = yield order_model_1.Order.findAll({
            attributes: [
                'status',
                [(0, sequelize_1.fn)('COUNT', (0, sequelize_1.col)('id')), 'count'],
                [(0, sequelize_1.fn)('SUM', (0, sequelize_1.col)('totalPrice')), 'totalSpent'],
                [(0, sequelize_1.fn)('AVG', (0, sequelize_1.col)('discount')), 'avgDiscount'],
            ],
            where: { userId },
            group: ['status'],
            raw: true,
        });
        const [totalOrders, totalsRaw] = yield Promise.all([
            order_model_1.Order.count({ where: { userId } }),
            order_model_1.Order.findOne({
                attributes: [
                    [(0, sequelize_1.fn)('SUM', (0, sequelize_1.col)('totalPrice')), 'totalSpent'],
                    [(0, sequelize_1.fn)('SUM', (0, sequelize_1.col)('discount')), 'totalSaved'],
                ],
                where: { userId },
                raw: true,
            }),
        ]);
        const totals = (totalsRaw || {});
        return res.status(200).json({
            success: true,
            stats: {
                totalOrders,
                totalSpent: Number(totals.totalSpent || 0),
                totalSaved: Number(totals.totalSaved || 0),
                byStatus: byStatusRaw,
            },
        });
    }
    catch (error) {
        console.error('Get order stats error:', error);
        return res.status(500).json({ success: false, message: 'Error fetching order statistics', error: error.message });
    }
});
exports.getOrderStats = getOrderStats;
