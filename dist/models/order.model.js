"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = exports.Order = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const user_model_1 = __importDefault(require("./user.model"));
const restaurant_model_1 = require("./restaurant.model");
class Order extends sequelize_1.Model {
}
exports.Order = Order;
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    totalPrice: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('Pending', 'Preparing', 'Delivered', 'Cancelled'),
        allowNull: false,
        defaultValue: 'Pending',
    },
}, {
    sequelize: db_1.sequelize,
    tableName: 'orders',
});
class OrderItem extends sequelize_1.Model {
}
exports.OrderItem = OrderItem;
OrderItem.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: 'order_items',
});
// Associations
Order.belongsTo(user_model_1.default, { foreignKey: 'userId' });
user_model_1.default.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(restaurant_model_1.Restaurant, { foreignKey: 'restaurantId' });
restaurant_model_1.Restaurant.hasMany(Order, { foreignKey: 'restaurantId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
