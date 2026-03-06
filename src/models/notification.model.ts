import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import User from './user.model';

export class Notification extends Model {
  public id!: number;
  public userId!: number;
  public orderId?: number;
  public title!: string;
  public message!: string;
  public notificationType!: 'order' | 'promotion' | 'review' | 'general';
  public isRead!: boolean;
  public actionUrl?: string;
  public icon?: string;
  public readAt?: Date;

  public readonly createdAt!: Date;
}

Notification.init({
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
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  notificationType: {
    type: DataTypes.ENUM('order', 'promotion', 'review', 'general'),
    defaultValue: 'general',
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  actionUrl: {
    type: DataTypes.STRING(255),
  },
  icon: {
    type: DataTypes.STRING(50),
  },
  readAt: {
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  tableName: 'notifications',
  timestamps: false,
  createdAt: 'createdAt',
  updatedAt: false,
});

export default Notification;
