import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

class Product extends Model {
  public id!: number;
  public product_name!: string;
  public category!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'products',
});

export default Product;
