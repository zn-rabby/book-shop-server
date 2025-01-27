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

export const orderService = {
  createOrder,
};
