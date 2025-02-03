import { Router } from 'express';
import { orderController } from './order.controller';
import validateRequest from '../../middleware/validateRequest';
import { OrderValidation } from './order.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { PaymentControllers } from './payment.controller';

const orderRouters = Router();

orderRouters.post(
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(OrderValidation.createOrderValidationSchema),
  orderController.createOrder,
);

orderRouters.get('/', orderController.getAllOrder);

orderRouters.get('/:id', orderController.getSingleOrder);

orderRouters.get(
  '/order-history/:email',
  auth(USER_ROLE.user, USER_ROLE.admin),
  orderController.getUserOrdersHistoryController,
);

orderRouters.patch(
  '/:id',
  validateRequest(OrderValidation.updateOrderValidationSchema),
  orderController.updateOrder,
);

orderRouters.delete('/:id', orderController.deleteOrder);
// payment routes

orderRouters.post(
  '/pay-success/:transactionId',
  PaymentControllers.paymentSuccessController,
);

orderRouters.post(
  '/payment-fail/:transactionId',
  PaymentControllers.paymentFailController,
);

orderRouters.post(
  '/payment-cancel/:transactionId',
  PaymentControllers.paymentCancelController,
);

export default orderRouters;
