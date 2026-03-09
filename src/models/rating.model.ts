import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Rating extends Model {
  public id!: number;
  public userId!: number;
  public orderId?: number;
  public productId?: number;
  public platformId?: number;
  public restaurantId?: number;
  public ratingType!: 'product' | 'platform' | 'restaurant' | 'delivery';
  public rating!: number;
  public review!: string;
  public helpful!: number;
}

Rating.init(
  {
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
      allowNull: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    platformId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ratingType: {
      type: DataTypes.ENUM('product', 'platform', 'restaurant', 'delivery'),
      allowNull: false,
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
      allowNull: true,
      defaultValue: '',
    },
    helpful: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'ratings',
    timestamps: true,
  }
);

export default Rating;
