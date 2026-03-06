import { Order, OrderItem } from '../models/order.model';
import User from '../models/user.model';
import { Restaurant } from '../models/restaurant.model';

/* ===========================
   CREATE ORDER
=========================== */

export const createOrder = async (orderData: any): Promise<Order> => {
  const { items, ...orderHeader } = orderData;

  const order = await Order.create(orderHeader);

  if (items && items.length > 0) {
    const orderItems = items.map((item: any) => ({
      ...item,
      orderId: order.id,
    }));

    await OrderItem.bulkCreate(orderItems);
  }

  return (await Order.findByPk(order.id, {
    include: [
      { model: User, attributes: ['name'] },
      { model: Restaurant, attributes: ['name'] },
      { model: OrderItem },
    ],
  })) as Order;
};

/* ===========================
   GET ALL ORDERS
=========================== */

export const getOrders = async (): Promise<Order[]> => {
  return await Order.findAll({
    include: [
      { model: User, attributes: ['name'] },
      { model: Restaurant, attributes: ['name'] },
      { model: OrderItem },
    ],
  });
};

/* ===========================
   GET ORDER BY ID
=========================== */

export const getOrderById = async (id: number): Promise<Order | null> => {
  return await Order.findByPk(id, {
    include: [
      { model: User, attributes: ['name'] },
      { model: Restaurant, attributes: ['name'] },
      { model: OrderItem },
    ],
  });
};

/* ===========================
   UPDATE ORDER STATUS
=========================== */

export const updateOrderStatus = async (
  id: number,
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled'
): Promise<Order | null> => {
  const order = await Order.findByPk(id);

  if (!order) return null;

  order.status = status;
  await order.save();

  return await Order.findByPk(id, {
    include: [
      { model: User, attributes: ['name'] },
      { model: Restaurant, attributes: ['name'] },
      { model: OrderItem },
    ],
  });
};

/* ===========================
   DELETE ORDER
=========================== */

export const deleteOrder = async (id: number): Promise<boolean> => {
  const order = await Order.findByPk(id);

  if (!order) return false;

  // Delete related order items first (safe even if cascade exists)
  await OrderItem.destroy({
    where: { orderId: id },
  });

  await order.destroy();

  return true;
};