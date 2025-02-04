/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import QueryBuilder from '../../builder/QueryBuilder';
import config from '../../config';
import AppError from '../../errors/AppError';
import Product from '../product/product.model';
import User from '../user/user.model';
import { orderSearchableFields } from './order.constant';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import { generateTransactionId } from './order.utils';
import { SSLCommerzService } from './sslcommerz.service';

const createOrder = async (payload: TOrder, userEmail: string) => {
  const user = await User.isUserExists(userEmail);
  if (!user) {
    throw new AppError(404, 'User not found!');
  }

  if (user.status === 'block') {
    throw new AppError(
      403,
      'Your account has been block!.you can not create order',
    );
  }

  // set user id
  payload.userId = user._id;

  const { product: productId, quantity } = payload;

  // Fetch the product to check inventory
  const product = await Product.findById(productId);
  if (!product) {
    return {
      status: false,
      message: 'Product not found',
    };
  }
  const products = await Product.findOne({ _id: payload.product });

  // check if product is exists
  if (!products) {
    throw new AppError(404, 'No product found with ID');
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
  // total amount of product
  payload.totalAmount = totalAmount;

  // payment method integration
  // if payment method is sslCommerz, initiate the payment
  if (payload.paymentMethod === 'sslCommerz') {
    const transactionId = generateTransactionId();

    try {
      const paymentResponse = await SSLCommerzService.initiatePayment({
        total_amount: totalAmount,
        currency: 'BDT',
        tran_id: transactionId,
        success_url: `http://localhost:5000/api/order/pay-success/${transactionId}`,
        fail_url: `http://localhost:5000/api/order/pay-fail/${transactionId}`,
        cancel_url: `http://localhost:5000/api/order/pay-cancel/${transactionId}`,
        shipping_method: 'Courier',
        product_name: product.title || '',
        product_category: product.category || '',
        product_profile: 'general',
        cus_name: user.name || 'Unknown',
        cus_email: user.email || 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
      });

      payload.transactionId = transactionId;

      const createdOrder = await Order.create({
        ...payload,
      });

      // decrease product quantity after creating the order
      await Product.findOneAndUpdate(
        { _id: payload.product },
        { $inc: { quantity: -payload.quantity } },
      );

      return {
        createdOrder,
        paymentUrl: paymentResponse,
      };
    } catch (err: any) {
      throw new AppError(500, 'Failed to initiate payment.');
    }
  }

  // create the order
  const createdOrder = await Order.create({
    ...payload,
  });

  // decrease product quantity after creating the order
  await Product.findOneAndUpdate(
    { _id: payload.product },
    { $inc: { quantity: -payload.quantity } },
  );

  return { createdOrder, paymentUrl: '' };
};

const getAllOrder = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(
    Order.find().populate('userId').populate('product'),
    query,
  )
    .search(orderSearchableFields)
    .filter()
    .paginate()
    .sort();

  const meta = await orderQuery.countTotal();
  const result = await orderQuery.modelQuery;

  // check no product found
  if (!result.length) {
    throw new AppError(404, 'No product found!');
  }

  return {
    meta,
    result,
  };
};

const getSingleOrder = async (id: string) => {
  const user = await Order.findById(id);
  return user;
};

const updateOrder = async (id: string, payload: Partial<TOrder>) => {
  const order = await Order.findById({ _id: id });

  if (!order) {
    throw new AppError(404, 'Blog not found! You cannot update it.');
  }
  const result = await Order.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteOrder = async (id: string) => {
  const order = await Order.findById(id);

  if (!order) {
    throw new AppError(404, 'Order not found!');
  }

  const result = await Order.findByIdAndDelete(id, { isDeleted: true });

  return result;
};

const getUserOrdersHistory = async (
  loggedInUserEmail: string,
  requestedUserEmail: string,
  query: Record<string, unknown>,
) => {
  if (loggedInUserEmail !== requestedUserEmail) {
    throw new AppError(
      403,
      'You are not authorized to view this order history',
    );
  }

  const user = await User.isUserExists(loggedInUserEmail);

  // check if user is exits
  if (!user) {
    throw new AppError(404, 'User not found');
  }

  // check if user is banned
  if (user.status === 'block') {
    throw new AppError(
      403,
      'Your account has been banned, and access is restricted.',
    );
  }

  const userOrderQuery = new QueryBuilder(
    Order.find({ userId: user._id }).populate('userId'),
    query,
  );

  // const userOrders = await Order.find({ userId: user._id }).populate('userId');
  const meta = await userOrderQuery.countTotal();
  const result = await userOrderQuery.modelQuery;

  if (!result || result.length === 0) {
    throw new AppError(404, 'No order were found this user');
  }

  return {
    meta,
    result,
  };
};

export const orderService = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  getUserOrdersHistory,
};
