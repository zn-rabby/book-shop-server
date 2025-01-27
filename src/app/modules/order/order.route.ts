import { Router } from 'express';
import { orderController } from './order.controller';

const orderRouters = Router();

orderRouters.post(
  '/',
  //  validateRequest(ProductValidation.productValidationSchema),
  orderController.createOrder,
);

orderRouters.get('/', orderController.getAllOrder);

orderRouters.get('/:id', orderController.getSingleOrder);

orderRouters.patch('/:id', orderController.updateOrder);

orderRouters.delete('/:id', orderController.deleteOrder);

export default orderRouters;
