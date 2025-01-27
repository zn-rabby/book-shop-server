import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { shippingSearchableFields } from './shippingAddress.constant';
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

const getSingleShippingAddress = async (id: string) => {
  const user = await ShippingAddress.findById(id);

  return user;
};

// const updateShippingAddress = async (
//   id: string,
//   payload: Partial<TShippingAddress>,
// ) => {
//   // check blog is exists
//   const product = await ShippingAddress.findById({ _id: id });

//   if (!product) {
//     throw new AppError(404, 'Blog not found! You cannot update it.');
//   }

//   // check the owner

//   //   if (product.author.toString() !== user._id.toString()) {
//   //     throw new AppError(
//   //       403,
//   //       'You are not the owner of this blog and cannot update it.',
//   //     );
//   //   }

//   const result = await updateShippingAddress.findByIdAndUpdate(id, payload, {
//     new: true,
//     runValidators: true,
//   });

//   return result;
// };
const updateShippingAddress = async (
  id: string,
  payload: Partial<TShippingAddress>,
) => {
  // Check if shipping address exists
  const shippingAddress = await ShippingAddress.findById(id);

  if (!shippingAddress) {
    throw new AppError(
      404,
      'Shipping address not found! You cannot update it.',
    );
  }

  // You can also add validation here for ownership if necessary (e.g. check if user is authorized to update)

  // Update the shipping address
  const updatedShippingAddress = await ShippingAddress.findByIdAndUpdate(
    id,
    payload,
    { new: true, runValidators: true },
  );

  return updatedShippingAddress;
};

const deleteShippingAddress = async (id: string) => {
  // check user is exists
  // const user = await User.isUserExists(userEmail);

  // if (!user) {
  //   throw new AppError(403, 'User not found! You cannot delete the blog.');
  // }

  // check blog is exists
  const product = await ShippingAddress.findById(id);

  if (!product) {
    throw new AppError(404, 'product not found!');
  }

  // check owner
  //   if (product._id.toString() !== product?.author.toString()) {
  //     throw new AppError(401, 'You are not authorized to delete this blog!');
  //   }

  const result = await ShippingAddress.findByIdAndDelete(id, { isDeleted: true });

  return result;
};

export const shippingService = {
  createShippingAddress,
  getAllShippingAddress,
  getSingleShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
};
