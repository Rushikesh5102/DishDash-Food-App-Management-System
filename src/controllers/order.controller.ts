import { Request, Response, NextFunction } from 'express';
import * as orderService from '../services/order.service';
import { Order } from '../models/order.model';
import Product from '../models/product.model';
import Platform from '../models/platform.model';
import { Restaurant } from '../models/restaurant.model';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
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
            return res.status(401).json({
                success: false,
                message: 'User not authenticated',
            });
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

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order,
        });
    } catch (error: any) {
        console.error('Create order error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message,
        });
    }
};

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await orderService.getOrders();
        res.json(orders);
    } catch (error) {
        next(error);
    }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await orderService.getOrderById(parseInt(req.params.id));
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
        const order = await orderService.updateOrderStatus(
            parseInt(req.params.id),
            req.body.status
        );

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
        const deleted = await orderService.deleteOrder(parseInt(req.params.id));

        if (deleted) {
            res.json({ message: "Order deleted successfully" });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        next(error);
    }
};

// New functions for user's order history

export const getUserOrderHistory = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { status, limit = 10, offset = 0 } = req.query;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated',
            });
        }

        const where: any = { userId };
        if (status) {
            where.status = status;
        }

        const { count, rows } = await Order.findAndCountAll({
            where,
            include: [
                {
                    model: Product,
                    attributes: ['id', 'name', 'imageUrl'],
                },
                {
                    model: Platform,
                    attributes: ['id', 'name', 'logoUrl'],
                },
                {
                    model: Restaurant,
                    attributes: ['id', 'name', 'cuisineType'],
                },
            ],
            limit: parseInt(limit as string),
            offset: parseInt(offset as string),
            order: [['orderDate', 'DESC']],
        });

        res.status(200).json({
            success: true,
            count,
            orders: rows,
        });
    } catch (error: any) {
        console.error('Get user order history error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching order history',
            error: error.message,
        });
    }
};

export const getOrderStats = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated',
            });
        }

        const stats = await Order.findAll({
            attributes: [
                'status',
                ['COUNT(*)', 'count'],
                ['SUM(totalPrice)', 'totalSpent'],
                ['AVG(discount)', 'avgDiscount'],
            ],
            where: { userId },
            group: ['status'],
            raw: true,
        });

        const totalOrders = await Order.count({ where: { userId } });
        const totalSpent = await Order.sum('totalPrice', { where: { userId } });
        const totalSaved = await Order.sum('discount', { where: { userId } });

        res.status(200).json({
            success: true,
            stats: {
                totalOrders,
                totalSpent: totalSpent || 0,
                totalSaved: totalSaved || 0,
                byStatus: stats,
            },
        });
    } catch (error: any) {
        console.error('Get order stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching order statistics',
            error: error.message,
        });
    }
};