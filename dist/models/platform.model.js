"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const platformSchema = new mongoose_1.Schema({
    platform_name: {
        type: String,
        required: true,
        unique: true,
    },
    service_area: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('Platform', platformSchema);
