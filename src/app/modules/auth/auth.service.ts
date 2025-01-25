import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import AppError from '../../errors/AppError';
import config from '../../config';
import jwt from 'jsonwebtoken';
import User from '../user/user.model';
import { IUser } from '../user/user.interface';

const register = async (payload: IUser) => {
  const user = await User.isUserExists(payload.email);
  if (user) {
    throw new AppError(400, 'User Already exists !');
  }

  const result = await User.create(payload);
  return result;
};

const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new AppError(404, 'User is not found!');
  }

  const isStatus = user.status; // Assuming isBlocked is boolean

  if (isStatus == 'block') {
    throw new AppError(403, 'Your account has been blocked.');
  }

  //checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  //create token and sent to the  client
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  // const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
  //   expiresIn: '30d',
  // });
  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '30d',
  });

  // jwt.verify(token, config.jwt_access_secret as string); // Ensure this matches

  return { token, user };
};

export const authService = {
  register,
  login,
};
