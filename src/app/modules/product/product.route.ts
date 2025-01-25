import { Router } from 'express';
import { productController } from './product.controller';
import validateRequest from '../../middleware/validateRequest';
import { ProductValidation } from './product.validation';

const productRouters = Router();

productRouters.post(
  '/',
  validateRequest(ProductValidation.productValidationSchema),
  productController.createProduct,
);

productRouters.patch('/:id', productController.updateProduct);

productRouters.delete('/:id', productController.updateProduct);

productRouters.get('/', productController.getAllProduct);

export default productRouters;
