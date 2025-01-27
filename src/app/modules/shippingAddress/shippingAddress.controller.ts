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

export const shippingController = {
  createShippingAddress,
  //   getAllProduct,
  //   getSingleProduct,
  //   updateProduct,
  //   deleteProduct,
};
