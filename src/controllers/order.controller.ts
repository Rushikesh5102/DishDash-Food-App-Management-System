import { Request, Response, NextFunction } from 'express';
import { fn, col } from 'sequelize';
import * as orderService from '../services/order.service';
import { Order } from '../models/order.model';
import Product from '../models/product.model';
import Platform from '../models/platform.model';
import { Restaurant } from '../models/restaurant.model';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const {
      productId,
      platformId,
      restaurantId,
      platformName,
      restaurantName,
      productName,
      price,
      deliveryFee,
      totalPrice,
      discount,
      notes,
    } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    if (!productId || !platformId || !totalPrice) {
      return res.status(400).json({
        success: false,
        message: 'Product ID, Platform ID, and Total Price are required',
      });
    }

    const order = await Order.create({
      userId,
      productId,
      platformId,
      restaurantId,
      platformName,
      restaurantName,
      productName,
      price,
      deliveryFee,
      totalPrice,
      discount,
      status: 'confirmed',
      orderDate: new Date(),
      notes,
    });

    return res.status(201).json({ success: true, message: 'Order created successfully', order });
  } catch (error: any) {
    console.error('Create order error:', error);
    return res.status(500).json({ success: false, message: 'Error creating order', error: error.message });
  }
};

export const getOrders = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await orderService.getOrders();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await orderService.deleteOrder(req.params.id);

    if (deleted) {
      res.json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const getUserOrderHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { status, limit = 10, offset = 0 } = req.query;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    const whereClause: Record<string, unknown> = { userId };
    if (status) whereClause.status = status;

    const parsedLimit = parseInt(String(limit), 10);
    const parsedOffset = parseInt(String(offset), 10);

    const { rows: orders, count } = await Order.findAndCountAll({
      where: whereClause,
      include: [Product, Platform, Restaurant],
      order: [['orderDate', 'DESC']],
      offset: parsedOffset,
      limit: parsedLimit,
    });

    return res.status(200).json({ success: true, count, orders });
  } catch (error: any) {
    console.error('Get user order history error:', error);
    return res.status(500).json({ success: false, message: 'Error fetching order history', error: error.message });
  }
};

export const getOrderStats = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    const byStatusRaw = await Order.findAll({
      attributes: [
        'status',
        [fn('COUNT', col('id')), 'count'],
        [fn('SUM', col('totalPrice')), 'totalSpent'],
        [fn('AVG', col('discount')), 'avgDiscount'],
      ],
      where: { userId },
      group: ['status'],
      raw: true,
    });

    const [totalOrders, totalsRaw] = await Promise.all([
      Order.count({ where: { userId } }),
      Order.findOne({
        attributes: [
          [fn('SUM', col('totalPrice')), 'totalSpent'],
          [fn('SUM', col('discount')), 'totalSaved'],
        ],
        where: { userId },
        raw: true,
      }),
    ]);

    const totals = (totalsRaw || {}) as Record<string, string | number | null>;

    return res.status(200).json({
      success: true,
      stats: {
        totalOrders,
        totalSpent: Number(totals.totalSpent || 0),
        totalSaved: Number(totals.totalSaved || 0),
        byStatus: byStatusRaw,
      },
    });
  } catch (error: any) {
    console.error('Get order stats error:', error);
    return res.status(500).json({ success: false, message: 'Error fetching order statistics', error: error.message });
  }
};
