import { Router } from 'express';
import { productController } from './product.controller';
import validateRequest from '../../middleware/validateRequest';
import { ProductValidation } from './product.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const productRouters = Router();

productRouters.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(ProductValidation.createProductValidationSchema),
  productController.createProduct,
);

productRouters.get('/', productController.getAllProduct);

productRouters.get('/:id', productController.getSingleProduct);

productRouters.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(ProductValidation.updateProductValidationSchema),
  productController.updateProduct,
);

productRouters.delete(
  '/:id',
  auth(USER_ROLE.admin),
  productController.deleteProduct,
);

export default productRouters;
