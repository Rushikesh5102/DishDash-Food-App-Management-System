import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import User from './user.model';
import { Restaurant } from './restaurant.model';

/* ===========================
   ORDER MODEL
=========================== */

interface OrderAttributes {
  id: number;
  totalPrice: number;
  status: 'Pending' | 'Preparing' | 'Delivered' | 'Cancelled';
  userId: number;
  restaurantId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderCreationAttributes
  extends Optional<OrderAttributes, 'id' | 'status'> {}

class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: number;
  public totalPrice!: number;
  public status!: 'Pending' | 'Preparing' | 'Delivered' | 'Cancelled';
  public userId!: number;
  public restaurantId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
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
      type: DataTypes.ENUM(
        'Pending',
        'Preparing',
        'Delivered',
        'Cancelled'
      ),
      allowNull: false,
      defaultValue: 'Pending',
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'orders',
    timestamps: true,
  }
);

/* ===========================
   ORDER ITEM MODEL
=========================== */

interface OrderItemAttributes {
  id: number;
  name: string;
  quantity: number;
  price: number;
  orderId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderItemCreationAttributes
  extends Optional<OrderItemAttributes, 'id'> {}

class OrderItem
  extends Model<OrderItemAttributes, OrderItemCreationAttributes>
  implements OrderItemAttributes
{
  public id!: number;
  public name!: string;
  public quantity!: number;
  public price!: number;
  public orderId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OrderItem.init(
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

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'order_items',
    timestamps: true,
  }
);

/* ===========================
   ASSOCIATIONS
=========================== */

Order.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

User.hasMany(Order, {
  foreignKey: 'userId',
});

Order.belongsTo(Restaurant, {
  foreignKey: 'restaurantId',
  onDelete: 'CASCADE',
});

Restaurant.hasMany(Order, {
  foreignKey: 'restaurantId',
});

Order.hasMany(OrderItem, {
  foreignKey: 'orderId',
  onDelete: 'CASCADE',
});

OrderItem.belongsTo(Order, {
  foreignKey: 'orderId',
});

export { Order, OrderItem };