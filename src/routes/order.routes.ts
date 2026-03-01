import { Router } from 'express';
import * as orderController from '../controllers/order.controller';
import validate from '../middleware/validation.middleware';
import Joi from 'joi';

const router = Router();

const orderItemSchema = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.number().required(),
  price: Joi.number().required(),
});

const orderSchema = Joi.object({
  restaurantId: Joi.number().required(),
  userId: Joi.number().optional(),
  items: Joi.array().items(orderItemSchema).required(),
  totalPrice: Joi.number().required(),
  status: Joi.string().optional(),
});

// GET all orders
router.get('/', orderController.getOrders);

// CREATE order
router.post('/', validate(orderSchema), orderController.createOrder);

// GET single order
router.get('/:id', orderController.getOrderById);

// UPDATE order status
router.put('/:id/status', orderController.updateOrderStatus);

// DELETE order
router.delete('/:id', orderController.deleteOrder);

export default router;