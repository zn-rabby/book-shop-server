import { Router } from 'express';
// import { productController } from './product.controller';
import { shippingController } from './shippingAddress.controller';
import validateRequest from '../../middleware/validateRequest';
import { ShippingAddressValidation } from './shippingAddress.validation';
// import validateRequest from '../../middleware/validateRequest';
// import { ProductValidation } from './product.validation';

const shippingRouters = Router();

shippingRouters.post(
  '/',
  validateRequest(ShippingAddressValidation.shippingAddressSchema),
  shippingController.createShippingAddress,
);

// shippingRouters.get('/', productController.getAllProduct);

// shippingRouters.get('/:id', productController.getSingleProduct);

// shippingRouters.patch('/:id', productController.updateProduct);

// shippingRouters.delete('/:id', productController.deleteProduct);

export default shippingRouters;
