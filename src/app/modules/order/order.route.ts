import { Router } from 'express';
import { orderController } from './order.controller';
import validateRequest from '../../middleware/validateRequest';
import { OrderValidation } from './order.validation';

const orderRouters = Router();

orderRouters.post(
  '/',
  validateRequest(OrderValidation.createOrderValidationSchema),
  orderController.createOrder,
);

orderRouters.get('/', orderController.getAllOrder);

orderRouters.get('/:id', orderController.getSingleOrder);

orderRouters.patch(
  '/:id',
  validateRequest(OrderValidation.updateOrderValidationSchema),
  orderController.updateOrder,
);

orderRouters.delete('/:id', orderController.deleteOrder);

export default orderRouters;
