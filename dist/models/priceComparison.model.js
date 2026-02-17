"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const priceComparisonSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    platform: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Platform',
        required: true,
    },
    compare_price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('PriceComparison', priceComparisonSchema);
