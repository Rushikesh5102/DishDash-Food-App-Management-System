import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import User from './user.model';
import Product from './product.model';
import Platform from './platform.model';

export class Favorite extends Model {
  public id!: number;
  public userId!: number;
  public productId!: number;
  public platformId!: number;
  public savedPrice!: number;
  public savedDeliveryFee!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Favorite.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  platformId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  savedPrice: {
    type: DataTypes.DECIMAL(10, 2),
  },
  savedDeliveryFee: {
    type: DataTypes.DECIMAL(10, 2),
  },
}, {
  sequelize,
  tableName: 'favorites',
  timestamps: true,
});

export default Favorite;
