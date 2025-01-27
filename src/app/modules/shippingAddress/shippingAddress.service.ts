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

export const shippingService = {
  createShippingAddress,
};
