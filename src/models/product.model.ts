import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Product extends Model {
  public id!: number;
  public restaurantId!: number;
  public name!: string;
  public category!: string;
  public imageUrl!: string | null;
}

Product.init(
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
    category: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
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
    updatedAt: false,
  }
);

export default Product;
