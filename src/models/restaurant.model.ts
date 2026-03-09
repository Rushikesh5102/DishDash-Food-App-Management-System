import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Restaurant extends Model {
  public id!: number;
  public name!: string;
  public location!: string;
  public cuisineType!: string;
}

class MenuItem extends Model {
  public id!: number;
  public restaurantId!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public category!: string;
}

Restaurant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'location',
    },
    cuisineType: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
  },
  {
    sequelize,
    tableName: 'restaurants',
    timestamps: true,
    updatedAt: false,
  }
);

MenuItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
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
  },
  {
    sequelize,
    tableName: 'menu_items',
    timestamps: true,
  }
);

Restaurant.hasMany(MenuItem, { foreignKey: 'restaurantId', onDelete: 'CASCADE' });
MenuItem.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

export { Restaurant, MenuItem };
