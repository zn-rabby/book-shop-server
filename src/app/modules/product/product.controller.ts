import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { productService } from './product.service';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.createProduct(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

const getAllProduct = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await productService.getAllProduct(query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product fetched successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const user = await productService.getSingleProduct(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Product Retrieved Successfully',
    data: user,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await productService.updateProduct(id, updatedData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  await productService.deleteProduct(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product deleted successfully',
    data: {},
  });
});

export const productController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
