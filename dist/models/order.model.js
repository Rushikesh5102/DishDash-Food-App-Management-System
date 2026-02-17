"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderItemSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});
const orderSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    items: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Preparing', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('Order', orderSchema);
