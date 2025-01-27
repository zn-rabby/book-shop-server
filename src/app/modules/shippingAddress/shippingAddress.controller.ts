import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { shippingService } from './shippingAddress.service';

const createShippingAddress = catchAsync(
  async (req: Request, res: Response) => {
    //   const userEmail = req?.user?.email;

    //   const result = await productService.createProduct(req.body, userEmail);
    const result = await shippingService.createShippingAddress(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Shipping Address created successfully',
      data: result,
    });
  },
);

const getAllShippingAddress = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await shippingService.getAllShippingAddress(query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Shipping Address fetched successfully',
    data: result,
  });
});

const getSingleShippingAddress = catchAsync(async (req, res) => {
  const user = await shippingService.getSingleShippingAddress(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Shipping Address Retrieved Successfully',
    data: user,
  });
});

export const shippingController = {
  createShippingAddress,
  getAllShippingAddress,
  getSingleShippingAddress,
  //   updateProduct,
  //   deleteProduct,
};
