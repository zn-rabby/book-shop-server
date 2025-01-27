import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { shippingSearchableFields } from './shippingAddress.contant';
import { TShippingAddress } from './shippingAddress.interface';
import ShippingAddress from './shippingAddress.model';

const createShippingAddress = async (payload: TShippingAddress) => {
  //   const user = await User.isUserExists(userEmail);

  //   if (!user) {
  //     throw new AppError(404, 'User not found!');
  //   }

  //   const userId = user?._id;

  //   const productData = { ...payload, author: userId };

  //   const result = await Product.create(productData);
  //   return result;
  const result = await ShippingAddress.create(payload);
  return result;
};

const getAllShippingAddress = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(ShippingAddress.find(), query)
    .search(shippingSearchableFields)
    .filter()
    .sort();

  const result = await blogQuery.modelQuery;

  // check no blogs found
  if (!result.length) {
    throw new AppError(404, 'No blogs found!');
  }

  return result;
};

export const shippingService = {
  createShippingAddress,
  getAllShippingAddress,
};
