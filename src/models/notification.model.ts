import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Notification extends Model {
  public id!: number;
  public userId!: number;
  public orderId?: number;
  public title!: string;
  public message!: string;
  public notificationType!: 'order' | 'promotion' | 'review' | 'general';
  public isRead!: boolean;
  public actionUrl!: string;
  public icon!: string;
  public readAt?: Date;
}

Notification.init(
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    notificationType: {
      type: DataTypes.ENUM('order', 'promotion', 'review', 'general'),
      allowNull: false,
      defaultValue: 'general',
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    actionUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    readAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'notifications',
    timestamps: true,
    updatedAt: false,
  }
);

export default Notification;
