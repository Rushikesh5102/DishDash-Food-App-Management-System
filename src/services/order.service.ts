import { Order, OrderItem } from '../models/order.model';
import User from '../models/user.model';
import { Restaurant } from '../models/restaurant.model';

export const createOrder = async (orderData: any): Promise<Order> => {
    const { items, ...orderHeader } = orderData;
    const order = await Order.create(orderHeader);

    if (items && items.length > 0) {
        const orderItems = items.map((item: any) => ({ ...item, orderId: order.id }));
        await OrderItem.bulkCreate(orderItems);
    }
    return (await Order.findByPk(order.id, {
        include: [
            { model: User, attributes: ['name'] },
            { model: Restaurant, attributes: ['name'] },
            { model: OrderItem }
        ]
    })) as Order;
};

export const getOrders = async (): Promise<Order[]> => {
    return await Order.findAll({
        include: [
            { model: User, attributes: ['name'] },
            { model: Restaurant, attributes: ['name'] },
            { model: OrderItem }
        ]
    });
};

export const getOrderById = async (id: number): Promise<Order | null> => {
    return await Order.findByPk(id, {
        include: [
            { model: User, attributes: ['name'] },
            { model: Restaurant, attributes: ['name'] },
            { model: OrderItem }
        ]
    });
};

export const updateOrderStatus = async (id: number, status: string): Promise<Order | null> => {
    const order = await Order.findByPk(id);
    if (order) {
        order.status = status;
        await order.save();
        return (await Order.findByPk(order.id, {
            include: [
                { model: User, attributes: ['name'] },
                { model: Restaurant, attributes: ['name'] },
                { model: OrderItem }
            ]
        })) as Order;
    }
    return null;
};
