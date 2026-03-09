import { Order } from '../models/order.model';
import Product from '../models/product.model';
import Platform from '../models/platform.model';
import { Restaurant } from '../models/restaurant.model';
import User from '../models/user.model';

export const createOrder = async (orderData: any) => {
  return Order.create(orderData);
};

export const getOrders = async () => {
  return Order.findAll({
    include: [User, Restaurant, Product, Platform],
    order: [['orderDate', 'DESC']],
  });
};

export const getOrderById = async (id: string) => {
  return Order.findByPk(Number(id), {
    include: [User, Restaurant, Product, Platform],
  });
};

export const updateOrderStatus = async (
  id: string,
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled'
) => {
  const order = await Order.findByPk(Number(id));
  if (!order) {
    return null;
  }

  order.status = status;
  await order.save();

  return Order.findByPk(Number(id), {
    include: [User, Restaurant, Product, Platform],
  });
};

export const deleteOrder = async (id: string): Promise<boolean> => {
  const deleted = await Order.destroy({ where: { id: Number(id) } });
  return deleted > 0;
};
