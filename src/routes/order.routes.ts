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
    restaurant: Joi.string().required(),
    items: Joi.array().items(orderItemSchema).required(),
    totalPrice: Joi.number().required(),
});

router.route('/')
    .get(orderController.getOrders)
    .post(validate(orderSchema), orderController.createOrder);

router.route('/:id')
    .get(orderController.getOrderById);

router.route('/:id/status')
    .put(orderController.updateOrderStatus);


export default router;
