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
exports.deleteOrder = exports.updateOrderStatus = exports.getOrderById = exports.getOrders = exports.createOrder = void 0;
const order_model_1 = require("../models/order.model");
const product_model_1 = __importDefault(require("../models/product.model"));
const platform_model_1 = __importDefault(require("../models/platform.model"));
const restaurant_model_1 = require("../models/restaurant.model");
const user_model_1 = __importDefault(require("../models/user.model"));
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    return order_model_1.Order.create(orderData);
});
exports.createOrder = createOrder;
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    return order_model_1.Order.findAll({
        include: [user_model_1.default, restaurant_model_1.Restaurant, product_model_1.default, platform_model_1.default],
        order: [['orderDate', 'DESC']],
    });
});
exports.getOrders = getOrders;
const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return order_model_1.Order.findByPk(Number(id), {
        include: [user_model_1.default, restaurant_model_1.Restaurant, product_model_1.default, platform_model_1.default],
    });
});
exports.getOrderById = getOrderById;
const updateOrderStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.findByPk(Number(id));
    if (!order) {
        return null;
    }
    order.status = status;
    yield order.save();
    return order_model_1.Order.findByPk(Number(id), {
        include: [user_model_1.default, restaurant_model_1.Restaurant, product_model_1.default, platform_model_1.default],
    });
});
exports.updateOrderStatus = updateOrderStatus;
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield order_model_1.Order.destroy({ where: { id: Number(id) } });
    return deleted > 0;
});
exports.deleteOrder = deleteOrder;
