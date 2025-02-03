import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { orderService } from './order.service';
import sendResponse from '../../utils/sendResponse';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req?.user?.email;

  //   const result = await productService.createProduct(req.body, userEmail);
  const result = await orderService.createOrder(req.body, userEmail);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getAllOrder = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await orderService.getAllOrder(query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order fetched successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const user = await orderService.getSingleOrder(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order Retrieved Successfully',
    data: user,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  // const userEmail = req?.user?.email;

  const result = await orderService.updateOrder(id, updatedData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order updated successfully',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const id = req.params.id;
  // const userEmail = req?.user?.email;
  await orderService.deleteOrder(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order deleted successfully',
    data: {},
  });
});

const getUserOrdersHistoryController = catchAsync(async (req, res) => {
  const loggedInUserEmail = req.user.email;

  const requestedUserEmail = req.params.email;
  const query = req.query;

  // const userEmail = req.user.email;
  const result = await orderService.getUserOrdersHistory(
    loggedInUserEmail,
    requestedUserEmail,
    query,
  );

  sendResponse(res, {
    success: true,
    message: 'User order history retrieved successfully',
    statusCode: 200,
    meta: result.meta,
    data: result.result,
  });
});

export const orderController = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  getUserOrdersHistoryController,
};
