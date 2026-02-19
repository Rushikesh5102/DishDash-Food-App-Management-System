"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("./Product"));
const Price_1 = __importDefault(require("./Price"));
const setupAssociations = () => {
    Product_1.default.hasMany(Price_1.default, {
        foreignKey: 'productId',
        as: 'prices',
    });
    Price_1.default.belongsTo(Product_1.default, {
        foreignKey: 'productId',
        as: 'product',
    });
};
exports.default = setupAssociations;
