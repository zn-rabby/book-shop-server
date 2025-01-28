import { Router } from 'express';
import { orderController } from './order.controller';
import validateRequest from '../../middleware/validateRequest';
import { OrderValidation } from './order.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const orderRouters = Router();

orderRouters.post(
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin),
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
