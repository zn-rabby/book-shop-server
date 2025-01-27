import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
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
  const result = await Order.create(payload);
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

export const orderService = {
  createOrder,
  getAllOrder,
  getSingleOrder,
};
