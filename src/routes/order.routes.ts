import { Router } from 'express';
import * as orderController from '../controllers/order.controller';
import validate from '../middleware/validation.middleware';
import Joi from 'joi';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

const orderSchema = Joi.object({
  productId: Joi.number().required(),
  platformId: Joi.number().required(),
  restaurantId: Joi.number().optional(),
  platformName: Joi.string().optional(),
  restaurantName: Joi.string().optional(),
  productName: Joi.string().optional(),
  price: Joi.number().optional(),
  deliveryFee: Joi.number().optional(),
  totalPrice: Joi.number().required(),
  discount: Joi.number().optional(),
  notes: Joi.string().allow('').optional(),
});

// GET all orders
router.get('/', orderController.getOrders);

// GET authenticated user's order history
router.get('/user/history', authMiddleware, orderController.getUserOrderHistory);

// GET authenticated user's order statistics
router.get('/user/stats', authMiddleware, orderController.getOrderStats);

// CREATE order
router.post('/', authMiddleware, validate(orderSchema), orderController.createOrder);

// GET single order
router.get('/:id', orderController.getOrderById);

// UPDATE order status
router.put('/:id/status', orderController.updateOrderStatus);

// DELETE order
router.delete('/:id', orderController.deleteOrder);

export default router;
