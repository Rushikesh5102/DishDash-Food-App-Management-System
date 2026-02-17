"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const menuItemSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
});
const restaurantSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    cuisine: { type: String, required: true },
    menu: [menuItemSchema],
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('Restaurant', restaurantSchema);
