import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import Product from '../product/product.model';
import { orderSearchableFields } from './order.constant';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrder = async (payload: TOrder) => {
  //   const user = await User.isUserExists(userEmail);
  //   if (!user) {
  //     throw new AppError(404, 'User not found!');
  //   }
  //   const userId = user?._id;

  //   const productData = { ...payload, author: userId };

  //   const result = await Product.create(productData);
  //   return result;

  const { product: productId, quantity } = payload;

  // Fetch the product to check inventory
  const product = await Product.findById(productId);
  if (!product) {
    return {
      status: false,
      message: 'Product not found',
    };
  }

  // Check if sufficient stock is available
  if (product.quantity < quantity) {
    return {
      status: false,
      message: 'Insufficient stock for this product',
    };
  }
  await Order.findByIdAndUpdate(
    product,
    {
      $inc: { quantity: quantity },
      $set: { inStock: product.quantity - quantity > 0 },
    },
    { new: true },
  );
  const totalAmount = product.price * quantity;
  //   console.log(totalAmount);
  const updatedData = { ...payload, totalAmount };
  const result = await Order.create(updatedData);

  return result;
};

const getAllOrder = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(
    Order.find().populate('userId').populate('product'),
    query,
  )
    .search(orderSearchableFields)
    .filter()
    .sort();

  const result = await blogQuery.modelQuery;

  // check no blogs found
  if (!result.length) {
    throw new AppError(404, 'No product found!');
  }

  return result;
};

const getSingleOrder = async (id: string) => {
  const user = await Order.findById(id);
  return user;
};

const updateOrder = async (id: string, payload: Partial<TOrder>) => {
  // check blog is exists
  const order = await Order.findById({ _id: id });

  if (!order) {
    throw new AppError(404, 'Blog not found! You cannot update it.');
  }

  // check the owner

  //   if (product.author.toString() !== user._id.toString()) {
  //     throw new AppError(
  //       403,
  //       'You are not the owner of this blog and cannot update it.',
  //     );
  //   }

  const result = await Order.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteOrder = async (id: string) => {
  // check user is exists
  // const user = await User.isUserExists(userEmail);

  // if (!user) {
  //   throw new AppError(403, 'User not found! You cannot delete the blog.');
  // }

  // check blog is exists
  const order = await Order.findById(id);

  if (!order) {
    throw new AppError(404, 'product not found!');
  }

  // check owner
  //   if (product._id.toString() !== product?.author.toString()) {
  //     throw new AppError(401, 'You are not authorized to delete this blog!');
  //   }

  const result = await Order.findByIdAndDelete(id, { isDeleted: true });

  return result;
};

export const orderService = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
