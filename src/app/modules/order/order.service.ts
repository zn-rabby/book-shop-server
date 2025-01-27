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

const updateOrder = async (id: string, payload: Partial<TOrder>) => {
  // check blog is exists
  const product = await Order.findById({ _id: id });

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

  const result = await Order.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const orderService = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  updateOrder,
};
