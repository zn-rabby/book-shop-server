import AppError from '../../errors/AppError';
import { IUser } from './user.interface';
import User from './user.model';

const register = async (payload: IUser) => {
  const user = await User.isUserExists(payload.email);
  if (user) {
    throw new AppError(400, 'User Already exists !');
  }

  const result = await User.create(payload);
  return result;
};

export const userService = {
  register,
};
