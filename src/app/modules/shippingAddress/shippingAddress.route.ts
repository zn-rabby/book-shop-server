import { Router } from 'express';
import { shippingController } from './shippingAddress.controller';
import validateRequest from '../../middleware/validateRequest';
import { ShippingAddressValidation } from './shippingAddress.validation';

const shippingRouters = Router();

shippingRouters.post(
  '/',
  validateRequest(ShippingAddressValidation.shippingAddressSchema),
  shippingController.createShippingAddress,
);

shippingRouters.get('/', shippingController.getAllShippingAddress);

// shippingRouters.get('/:id', productController.getSingleProduct);

// shippingRouters.patch('/:id', productController.updateProduct);

// shippingRouters.delete('/:id', productController.deleteProduct);

export default shippingRouters;
