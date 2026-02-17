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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenuItem = exports.updateMenuItem = exports.addMenuItem = exports.deleteRestaurant = exports.updateRestaurant = exports.getRestaurantById = exports.getRestaurants = exports.createRestaurant = void 0;
const restaurantService = __importStar(require("../services/restaurant.service"));
const createRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield restaurantService.createRestaurant(req.body);
        res.status(201).json(restaurant);
    }
    catch (error) {
        next(error);
    }
});
exports.createRestaurant = createRestaurant;
const getRestaurants = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield restaurantService.getRestaurants();
        res.json(restaurants);
    }
    catch (error) {
        next(error);
    }
});
exports.getRestaurants = getRestaurants;
const getRestaurantById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield restaurantService.getRestaurantById(req.params.id);
        if (restaurant) {
            res.json(restaurant);
        }
        else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getRestaurantById = getRestaurantById;
const updateRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield restaurantService.updateRestaurant(req.params.id, req.body);
        if (restaurant) {
            res.json(restaurant);
        }
        else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateRestaurant = updateRestaurant;
const deleteRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield restaurantService.deleteRestaurant(req.params.id);
        if (restaurant) {
            res.json({ message: 'Restaurant deleted' });
        }
        else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteRestaurant = deleteRestaurant;
const addMenuItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield restaurantService.addMenuItem(req.params.id, req.body);
        if (restaurant) {
            res.json(restaurant);
        }
        else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.addMenuItem = addMenuItem;
const updateMenuItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield restaurantService.updateMenuItem(req.params.id, req.params.itemId, req.body);
        if (restaurant) {
            res.json(restaurant);
        }
        else {
            res.status(404).json({ message: 'Restaurant or menu item not found' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateMenuItem = updateMenuItem;
const deleteMenuItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield restaurantService.deleteMenuItem(req.params.id, req.params.itemId);
        if (restaurant) {
            res.json(restaurant);
        }
        else {
            res.status(404).json({ message: 'Restaurant or menu item not found' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteMenuItem = deleteMenuItem;
