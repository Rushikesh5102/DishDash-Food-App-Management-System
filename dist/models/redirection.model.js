"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const redirectionSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    priceComparison: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'PriceComparison',
        required: true,
    },
    redirection_url: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('Redirection', redirectionSchema);
