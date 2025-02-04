import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { shippingService } from './shippingAddress.service';

const createShippingAddress = catchAsync(
  async (req: Request, res: Response) => {
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

const updateShippingAddress = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await shippingService.updateShippingAddress(id, updatedData);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Shipping Address updated successfully',
      data: result,
    });
  },
);

const deleteShippingAddress = catchAsync(async (req, res) => {
  const id = req.params.id;
  await shippingService.deleteShippingAddress(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Shipping Address deleted successfully',
    data: {},
  });
});

export const shippingController = {
  createShippingAddress,
  getAllShippingAddress,
  getSingleShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
};
