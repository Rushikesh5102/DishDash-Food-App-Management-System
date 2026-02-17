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
const restaurantController = __importStar(require("../controllers/restaurant.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const validation_middleware_1 = __importDefault(require("../middleware/validation.middleware"));
const joi_1 = __importDefault(require("joi"));
const router = (0, express_1.Router)();
const restaurantSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    cuisine: joi_1.default.string().required(),
});
const menuItemSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    category: joi_1.default.string().required(),
});
router.route('/')
    .get(restaurantController.getRestaurants)
    .post(auth_middleware_1.default, (0, validation_middleware_1.default)(restaurantSchema), restaurantController.createRestaurant);
router.route('/:id')
    .get(restaurantController.getRestaurantById)
    .put(auth_middleware_1.default, (0, validation_middleware_1.default)(restaurantSchema), restaurantController.updateRestaurant)
    .delete(auth_middleware_1.default, restaurantController.deleteRestaurant);
router.route('/:id/menu')
    .post(auth_middleware_1.default, (0, validation_middleware_1.default)(menuItemSchema), restaurantController.addMenuItem);
router.route('/:id/menu/:itemId')
    .put(auth_middleware_1.default, (0, validation_middleware_1.default)(menuItemSchema), restaurantController.updateMenuItem)
    .delete(auth_middleware_1.default, restaurantController.deleteMenuItem);
exports.default = router;
