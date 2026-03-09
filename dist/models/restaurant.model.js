"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItem = exports.Restaurant = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Restaurant extends sequelize_1.Model {
}
exports.Restaurant = Restaurant;
class MenuItem extends sequelize_1.Model {
}
exports.MenuItem = MenuItem;
Restaurant.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'location',
    },
    cuisineType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    },
}, {
    sequelize: db_1.sequelize,
    tableName: 'restaurants',
    timestamps: true,
    updatedAt: false,
});
MenuItem.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    restaurantId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: 'menu_items',
    timestamps: true,
});
Restaurant.hasMany(MenuItem, { foreignKey: 'restaurantId', onDelete: 'CASCADE' });
MenuItem.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
