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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenuItem = exports.updateMenuItem = exports.addMenuItem = exports.deleteRestaurant = exports.updateRestaurant = exports.getRestaurantById = exports.getRestaurants = exports.createRestaurant = void 0;
const restaurant_model_1 = require("../models/restaurant.model");
const createRestaurant = (restaurantData) => __awaiter(void 0, void 0, void 0, function* () {
    return restaurant_model_1.Restaurant.create({
        name: restaurantData.name,
        location: restaurantData.address,
        cuisineType: restaurantData.cuisine,
    });
});
exports.createRestaurant = createRestaurant;
const getRestaurants = () => __awaiter(void 0, void 0, void 0, function* () {
    return restaurant_model_1.Restaurant.findAll({
        include: [restaurant_model_1.MenuItem],
        order: [['createdAt', 'DESC']],
    });
});
exports.getRestaurants = getRestaurants;
const getRestaurantById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return restaurant_model_1.Restaurant.findByPk(Number(id), { include: [restaurant_model_1.MenuItem] });
});
exports.getRestaurantById = getRestaurantById;
const updateRestaurant = (id, restaurantData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatePayload = {};
    if (restaurantData.name !== undefined)
        updatePayload.name = restaurantData.name;
    if (restaurantData.address !== undefined)
        updatePayload.location = restaurantData.address;
    if (restaurantData.cuisine !== undefined)
        updatePayload.cuisineType = restaurantData.cuisine;
    const [affectedCount] = yield restaurant_model_1.Restaurant.update(updatePayload, { where: { id: Number(id) } });
    if (affectedCount > 0) {
        return restaurant_model_1.Restaurant.findByPk(Number(id), { include: [restaurant_model_1.MenuItem] });
    }
    return null;
});
exports.updateRestaurant = updateRestaurant;
const deleteRestaurant = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return restaurant_model_1.Restaurant.destroy({ where: { id: Number(id) } });
});
exports.deleteRestaurant = deleteRestaurant;
const addMenuItem = (restaurantId, menuItem) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield restaurant_model_1.Restaurant.findByPk(Number(restaurantId));
    if (!restaurant) {
        return null;
    }
    return restaurant_model_1.MenuItem.create(Object.assign(Object.assign({}, menuItem), { restaurantId: Number(restaurantId) }));
});
exports.addMenuItem = addMenuItem;
const updateMenuItem = (restaurantId, menuItemId, menuItemData) => __awaiter(void 0, void 0, void 0, function* () {
    const [affectedCount] = yield restaurant_model_1.MenuItem.update(menuItemData, {
        where: { id: Number(menuItemId), restaurantId: Number(restaurantId) },
    });
    if (affectedCount > 0) {
        return restaurant_model_1.MenuItem.findByPk(Number(menuItemId));
    }
    return null;
});
exports.updateMenuItem = updateMenuItem;
const deleteMenuItem = (restaurantId, menuItemId) => __awaiter(void 0, void 0, void 0, function* () {
    return restaurant_model_1.MenuItem.destroy({
        where: { id: Number(menuItemId), restaurantId: Number(restaurantId) },
    });
});
exports.deleteMenuItem = deleteMenuItem;
