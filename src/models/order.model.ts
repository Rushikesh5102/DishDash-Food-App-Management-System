import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Order extends Model {
  public id!: number;
  public userId!: number;
  public productId?: number;
  public platformId?: number;
  public restaurantId?: number;
  public platformName!: string;
  public restaurantName!: string;
  public productName!: string;
  public price!: number;
  public deliveryFee!: number;
  public totalPrice!: number;
  public discount!: number;
  public status!: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  public orderDate!: Date;
  public deliveryDate?: Date;
  public notes!: string;
}

Order.init(
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
    platformName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    restaurantName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0,
    },
    deliveryFee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'delivered', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    deliveryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '',
    },
  },
  {
    sequelize,
    tableName: 'orders',
    timestamps: true,
  }
);

export { Order };
