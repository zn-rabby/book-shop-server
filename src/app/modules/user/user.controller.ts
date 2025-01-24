import { StatusCodes } from 'http-status-codes';
import { userService } from './user.service';

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

export const userController = {
  register,
};
