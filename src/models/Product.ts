import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import Price from './Price'; // Import Price model

class Product extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public imageUrl!: string;

  // Define association
  public getPrices!: () => Promise<Price[]>;
  public addPrice!: (price: Price) => Promise<any>;
}

Product.init(
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
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: true,
  }
);

Product.hasMany(Price, {
  foreignKey: 'productId',
  as: 'prices',
});

export default Product;
