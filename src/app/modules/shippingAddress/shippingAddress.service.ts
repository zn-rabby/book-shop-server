import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { shippingSearchableFields } from './shippingAddress.constant';
import { TShippingAddress } from './shippingAddress.interface';
import ShippingAddress from './shippingAddress.model';

const createShippingAddress = async (payload: TShippingAddress) => {
  const result = await ShippingAddress.create(payload);
  return result;
};

const getAllShippingAddress = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(ShippingAddress.find(), query)
    .search(shippingSearchableFields)
    .filter()
    .sort();

  const result = await blogQuery.modelQuery;

  if (!result.length) {
    throw new AppError(404, 'Shipping Address not found!');
  }

  return result;
};

const getSingleShippingAddress = async (id: string) => {
  const user = await ShippingAddress.findById(id);

  return user;
};

const updateShippingAddress = async (
  id: string,
  payload: Partial<TShippingAddress>,
) => {
  const shippingAddress = await ShippingAddress.findById(id);

  if (!shippingAddress) {
    throw new AppError(
      404,
      'Shipping address not found! You cannot update it.',
    );
  }

  const updatedShippingAddress = await ShippingAddress.findByIdAndUpdate(
    id,
    payload,
    { new: true, runValidators: true },
  );

  return updatedShippingAddress;
};

const deleteShippingAddress = async (id: string) => {
  const address = await ShippingAddress.findById(id);

  if (!address) {
    throw new AppError(404, 'product not found!');
  }
  // check owner
  //   if (product._id.toString() !== address?.author.toString()) {
  //     throw new AppError(401, 'You are not authorized to delete this address!');
  //   }

  const result = await ShippingAddress.findByIdAndDelete(id, {
    isDeleted: true,
  });

  return result;
};

export const shippingService = {
  createShippingAddress,
  getAllShippingAddress,
  getSingleShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
};
