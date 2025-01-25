import { StatusCodes } from 'http-status-codes';
import { userService } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Request, Response } from 'express';

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

export const userController = {
  register,
  login,
  userRoleUpdate,
};
