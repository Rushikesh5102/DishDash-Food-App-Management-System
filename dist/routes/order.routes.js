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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController = __importStar(require("../controllers/order.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const validation_middleware_1 = __importDefault(require("../middleware/validation.middleware"));
const joi_1 = __importDefault(require("joi"));
const router = (0, express_1.Router)();
const orderItemSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    quantity: joi_1.default.number().required(),
    price: joi_1.default.number().required(),
});
const orderSchema = joi_1.default.object({
    restaurant: joi_1.default.string().required(),
    items: joi_1.default.array().items(orderItemSchema).required(),
    totalPrice: joi_1.default.number().required(),
});
router.route('/')
    .get(auth_middleware_1.default, orderController.getOrders)
    .post(auth_middleware_1.default, (0, validation_middleware_1.default)(orderSchema), orderController.createOrder);
router.route('/:id')
    .get(auth_middleware_1.default, orderController.getOrderById);
router.route('/:id/status')
    .put(auth_middleware_1.default, orderController.updateOrderStatus);
exports.default = router;
