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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getOrderById = exports.getOrders = exports.createOrder = void 0;
const order_model_1 = require("../models/order.model");
const user_model_1 = __importDefault(require("../models/user.model"));
const restaurant_model_1 = require("../models/restaurant.model");
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { items } = orderData, orderHeader = __rest(orderData, ["items"]);
    const order = yield order_model_1.Order.create(orderHeader);
    if (items && items.length > 0) {
        const orderItems = items.map((item) => (Object.assign(Object.assign({}, item), { orderId: order.id })));
        yield order_model_1.OrderItem.bulkCreate(orderItems);
    }
    return (yield order_model_1.Order.findByPk(order.id, {
        include: [
            { model: user_model_1.default, attributes: ['name'] },
            { model: restaurant_model_1.Restaurant, attributes: ['name'] },
            { model: order_model_1.OrderItem }
        ]
    }));
});
exports.createOrder = createOrder;
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.Order.findAll({
        include: [
            { model: user_model_1.default, attributes: ['name'] },
            { model: restaurant_model_1.Restaurant, attributes: ['name'] },
            { model: order_model_1.OrderItem }
        ]
    });
});
exports.getOrders = getOrders;
const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.Order.findByPk(id, {
        include: [
            { model: user_model_1.default, attributes: ['name'] },
            { model: restaurant_model_1.Restaurant, attributes: ['name'] },
            { model: order_model_1.OrderItem }
        ]
    });
});
exports.getOrderById = getOrderById;
const updateOrderStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.findByPk(id);
    if (order) {
        order.status = status;
        yield order.save();
        return (yield order_model_1.Order.findByPk(order.id, {
            include: [
                { model: user_model_1.default, attributes: ['name'] },
                { model: restaurant_model_1.Restaurant, attributes: ['name'] },
                { model: order_model_1.OrderItem }
            ]
        }));
    }
    return null;
});
exports.updateOrderStatus = updateOrderStatus;
