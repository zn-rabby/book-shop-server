import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
// import User from '../user/user.model';
import { blogSearchableFields } from './product.constant';
import { TProduct } from './product.interface';
import Product from './product.model';

const createProduct = async (payload: TProduct) => {
  //   const user = await User.isUserExists(userEmail);

  //   if (!user) {
  //     throw new AppError(404, 'User not found!');
  //   }

  //   const userId = user?._id;

  //   const productData = { ...payload, author: userId };

  //   const result = await Product.create(productData);
  //   return result;
  const result = await Product.create(payload);
  return result;
};

const getAllProduct = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Product.find().populate('author'), query)
    .search(blogSearchableFields)
    .filter()
    .sort();

  const result = await blogQuery.modelQuery;

  // check no blogs found
  if (!result.length) {
    throw new AppError(404, 'No blogs found!');
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
    throw new AppError(404, 'Blog not found! You cannot update it.');
  }

  // check the owner

  //   if (product.author.toString() !== user._id.toString()) {
  //     throw new AppError(
  //       403,
  //       'You are not the owner of this blog and cannot update it.',
  //     );
  //   }

  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteProduct = async (id: string) => {
  // check user is exists
  // const user = await User.isUserExists(userEmail);

  // if (!user) {
  //   throw new AppError(403, 'User not found! You cannot delete the blog.');
  // }

  // check blog is exists
  const product = await Product.findById(id);

  if (!product) {
    throw new AppError(404, 'product not found!');
  }

  // check owner
  //   if (product._id.toString() !== product?.author.toString()) {
  //     throw new AppError(401, 'You are not authorized to delete this blog!');
  //   }

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
