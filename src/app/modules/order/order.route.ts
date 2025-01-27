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

// productRouters.patch('/:id', productController.updateProduct);

// productRouters.delete('/:id', productController.deleteProduct);

export default orderRouters;
