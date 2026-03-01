import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

class Product extends Model {
  public id!: number;
  public name!: string;
  public category!: string;
  public restaurantName!: string;
  public imageUrl!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    restaurantName: {
      type: DataTypes.STRING,
      allowNull: false,
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

export default Product;