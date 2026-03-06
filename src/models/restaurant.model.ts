import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/db';

class Restaurant extends Model {
  public id!: number;
  public name!: string;
  public address!: string;
  public cuisine!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Restaurant.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cuisine: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'restaurants',
  timestamps: false,
});

class MenuItem extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public category!: string;
  public restaurantId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MenuItem.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'menu_items',
});

Restaurant.hasMany(MenuItem, { foreignKey: 'restaurantId' });
MenuItem.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

export { Restaurant, MenuItem };
