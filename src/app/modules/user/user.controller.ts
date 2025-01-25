import { StatusCodes } from 'http-status-codes';
import { userService } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Request, RequestHandler, Response } from 'express';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.register(req.body);
  // const { _id, name, email } = result;

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.login(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const result = await userService.getAllUsers(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleUsers = catchAsync(async (req, res) => {
  const user = await userService.getSingleUsers(req.params.userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User Retrieved Successfully',
    data: user,
  });
});

const userRoleUpdate = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const updatedData = req.body;

  await userService.userRoleUpdate(userId, updatedData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User Role Update successfully',
    data: {},
  });
});

const userStatusUpdate = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const updatedData = req.body;

  await userService.userStatusUpdate(userId, updatedData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User Status Update successfully',
    data: {},
  });
});

const userUpdate = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const updatedData = req.body;

  await userService.userUpdate(userId, updatedData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User Update successfully',
    data: {},
  });
});

export const userController = {
  register,
  login,
  getAllUsers,
  getSingleUsers,
  userRoleUpdate,
  userStatusUpdate,
  userUpdate,
};
