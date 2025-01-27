import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { blogSearchableFields } from './product.constant';
import { TProduct } from './product.interface';
import Product from './product.model';

const createProduct = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProduct = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Product.find(), query)
    .search(blogSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await blogQuery.modelQuery;

  if (!result.length) {
    throw new AppError(404, 'No products found!');
  }
  return result;
};

const getSingleProduct = async (id: string) => {
  const user = await Product.findById(id);

  return user;
};

const updateProduct = async (id: string, payload: Partial<TProduct>) => {
  // check blog is exists
  const product = await Product.findById({ _id: id });

  if (!product) {
    throw new AppError(404, 'Product not found!');
  }

  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteProduct = async (id: string) => {
  // check blog is exists
  const product = await Product.findById(id);

  if (!product) {
    throw new AppError(404, 'Product not found!');
  }

  const result = await Product.findByIdAndDelete(id, { isDeleted: true });

  return result;
};

export const productService = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
