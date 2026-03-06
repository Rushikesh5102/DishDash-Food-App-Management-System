import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import User from './user.model';
import { Restaurant } from './restaurant.model';

/* ===========================
   ORDER MODEL (Enhanced)
=========================== */

interface OrderAttributes {
  id: number;
  userId: number;
  productId?: number;
  platformId?: number;
  restaurantId?: number;
  platformName?: string;
  restaurantName?: string;
  productName?: string;
  price?: number;
  deliveryFee?: number;
  totalPrice: number;
  discount?: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  orderDate?: Date;
  deliveryDate?: Date;
  notes?: string;
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
  public userId!: number;
  public productId?: number;
  public platformId?: number;
  public restaurantId?: number;
  public platformName?: string;
  public restaurantName?: string;
  public productName?: string;
  public price?: number;
  public deliveryFee?: number;
  public totalPrice!: number;
  public discount?: number;
  public status!: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  public orderDate?: Date;
  public deliveryDate?: Date;
  public notes?: string;

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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    platformName: {
      type: DataTypes.STRING(100),
    },
    restaurantName: {
      type: DataTypes.STRING(255),
    },
    productName: {
      type: DataTypes.STRING(255),
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    deliveryFee: {
      type: DataTypes.DECIMAL(10, 2),
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'delivered', 'cancelled'),
      defaultValue: 'pending',
    },
    orderDate: {
      type: DataTypes.DATE,
    },
    deliveryDate: {
      type: DataTypes.DATE,
    },
    notes: {
      type: DataTypes.TEXT,
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