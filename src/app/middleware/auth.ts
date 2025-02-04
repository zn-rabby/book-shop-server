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
    const token = req.headers.authorization;

    // // check if token is Bearer or not
    // if (!authHeader || !authHeader.startsWith('Bearer')) {
    //   throw new HttpError(
    //     401,
    //     'Missing or invalid authorization header. Please ensure the request includes a valid Bearer token',
    //   );
    // }

    // const token = authHeader.split(' ')[1];
    // console.log(token)

    if (!token) {
      throw new AppError(
        401,
        'Access token is missing or invalid. Please provide a valid token to access this resource.',
      );
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

    const status = user.status;

    if (status === 'block') {
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
