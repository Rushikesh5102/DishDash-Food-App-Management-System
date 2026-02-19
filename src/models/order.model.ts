import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import User from './user.model';
import { Restaurant } from './restaurant.model';

class Order extends Model {
  public id!: number;
  public totalPrice!: number;
  public status!: string;
  public userId!: number;
  public restaurantId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Preparing', 'Delivered', 'Cancelled'),
    allowNull: false,
    defaultValue: 'Pending',
  },
}, {
  sequelize,
  tableName: 'orders',
});

class OrderItem extends Model {
  public id!: number;
  public name!: string;
  public quantity!: number;
  public price!: number;
  public orderId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OrderItem.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'order_items',
});

// Associations
Order.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });

Order.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
Restaurant.hasMany(Order, { foreignKey: 'restaurantId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

export { Order, OrderItem };
