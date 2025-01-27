import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { orderService } from './order.service';
import sendResponse from '../../utils/sendResponse';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  //   const userEmail = req?.user?.email;

  //   const result = await productService.createProduct(req.body, userEmail);
  const result = await orderService.createOrder(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

export const orderController = {
  createOrder,
};
