import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import config from '../config';
import AppError from '../errors/AppError';
import User from '../modules/user/user.model';
import { IUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: IUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new AppError(401, 'Invalid Credentials');
    }

    const token = authHeader.split(' ')[1];
    // checking if the token is missing
    if (!token) {
      // throw new Error('You are not authorized!');
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    // console.log({ decoded });

    const { role, email } = decoded;

    // checking if the user is exist
    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
    }

    // checking if the user is inactive
    const isBlocked = user.isBlocked;

    if (isBlocked) {
      throw new AppError(403, 'Your account has been blocked!');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
