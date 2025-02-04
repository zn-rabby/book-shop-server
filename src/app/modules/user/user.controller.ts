import { userService } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RequestHandler } from 'express';

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
    data: updatedData,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  await userService.deleteUser(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'user deleted successfully',
    data: {},
  });
});
export const userController = {
  getAllUsers,
  getSingleUsers,
  userRoleUpdate,
  userStatusUpdate,
  userUpdate,
  deleteUser,
};
