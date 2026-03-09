"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Order extends sequelize_1.Model {
}
exports.Order = Order;
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    platformId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    restaurantId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    platformName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    },
    restaurantName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    },
    productName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
    },
    deliveryFee: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
    },
    totalPrice: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    discount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'confirmed', 'delivered', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
    },
    orderDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    deliveryDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    notes: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        defaultValue: '',
    },
}, {
    sequelize: db_1.sequelize,
    tableName: 'orders',
    timestamps: true,
});
