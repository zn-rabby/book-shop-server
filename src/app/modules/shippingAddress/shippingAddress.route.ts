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

shippingRouters.get('/:id', shippingController.getSingleShippingAddress);

shippingRouters.patch('/:id', shippingController.updateShippingAddress);

shippingRouters.delete('/:id', shippingController.deleteShippingAddress);

export default shippingRouters;
