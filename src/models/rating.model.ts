import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import User from './user.model';

export class Rating extends Model {
  public id!: number;
  public userId!: number;
  public orderId?: number;
  public productId?: number;
  public platformId?: number;
  public restaurantId?: number;
  public ratingType!: 'product' | 'platform' | 'restaurant' | 'delivery';
  public rating!: number;
  public review?: string;
  public helpful!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Rating.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orderId: {
    type: DataTypes.INTEGER,
  },
  productId: {
    type: DataTypes.INTEGER,
  },
  platformId: {
    type: DataTypes.INTEGER,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
  },
  ratingType: {
    type: DataTypes.ENUM('product', 'platform', 'restaurant', 'delivery'),
    defaultValue: 'product',
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  review: {
    type: DataTypes.TEXT,
  },
  helpful: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  sequelize,
  tableName: 'ratings',
  timestamps: true,
});

export default Rating;
