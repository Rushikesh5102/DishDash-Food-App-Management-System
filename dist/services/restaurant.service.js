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
exports.deleteMenuItem = exports.updateMenuItem = exports.addMenuItem = exports.deleteRestaurant = exports.updateRestaurant = exports.getRestaurantById = exports.getRestaurants = exports.createRestaurant = void 0;
const restaurant_model_1 = __importDefault(require("../models/restaurant.model"));
const createRestaurant = (restaurantData) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = new restaurant_model_1.default(restaurantData);
    return yield restaurant.save();
});
exports.createRestaurant = createRestaurant;
const getRestaurants = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield restaurant_model_1.default.find();
});
exports.getRestaurants = getRestaurants;
const getRestaurantById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield restaurant_model_1.default.findById(id);
});
exports.getRestaurantById = getRestaurantById;
const updateRestaurant = (id, restaurantData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield restaurant_model_1.default.findByIdAndUpdate(id, restaurantData, { new: true });
});
exports.updateRestaurant = updateRestaurant;
const deleteRestaurant = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield restaurant_model_1.default.findByIdAndDelete(id);
});
exports.deleteRestaurant = deleteRestaurant;
const addMenuItem = (restaurantId, menuItem) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield restaurant_model_1.default.findById(restaurantId);
    if (restaurant) {
        restaurant.menu.push(menuItem);
        return yield restaurant.save();
    }
    return null;
});
exports.addMenuItem = addMenuItem;
const updateMenuItem = (restaurantId, menuItemId, menuItemData) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield restaurant_model_1.default.findById(restaurantId);
    if (restaurant) {
        const menuItem = restaurant.menu.id(menuItemId);
        if (menuItem) {
            menuItem.set(menuItemData);
            return yield restaurant.save();
        }
    }
    return null;
});
exports.updateMenuItem = updateMenuItem;
const deleteMenuItem = (restaurantId, menuItemId) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield restaurant_model_1.default.findById(restaurantId);
    if (restaurant) {
        const menuItem = restaurant.menu.id(menuItemId);
        if (menuItem) {
            restaurant.menu = restaurant.menu.filter(item => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) !== menuItemId; });
            return yield restaurant.save();
        }
    }
    return null;
});
exports.deleteMenuItem = deleteMenuItem;
