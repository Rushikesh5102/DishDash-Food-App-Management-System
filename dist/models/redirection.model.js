"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const product_model_1 = __importDefault(require("./product.model"));
const priceComparison_model_1 = __importDefault(require("./priceComparison.model"));
class Redirection extends sequelize_1.Model {
}
Redirection.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    redirection_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: 'redirections',
});
// Associations
Redirection.belongsTo(product_model_1.default, { foreignKey: 'productId' });
product_model_1.default.hasMany(Redirection, { foreignKey: 'productId' });
Redirection.belongsTo(priceComparison_model_1.default, { foreignKey: 'priceComparisonId' });
priceComparison_model_1.default.hasMany(Redirection, { foreignKey: 'priceComparisonId' });
exports.default = Redirection;
