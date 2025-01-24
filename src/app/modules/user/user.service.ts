import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
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

const login = async (payload: { email: string; password: string }) => {
  // Find the user by email and select password
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new AppError(404, 'User is not found!');
  }

  const isBlocked = user.isBlocked; // Assuming isBlocked is boolean

  if (isBlocked) {
    throw new AppError(403, 'Your account has been blocked.');
  }

  // Checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  // No JWT token is created, just return the user object
  return { user };
};

export const userService = {
  register,
  login,
};
