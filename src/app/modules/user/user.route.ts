import { Router } from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
const userRoutes = Router();

userRoutes.post(
  '/register',
  validateRequest(UserValidation.registerUserValidationSchema),
  userController.register,
);

userRoutes.post(
  '/login',
  validateRequest(UserValidation.loginValidationSchema),
  userController.login,
);


export default userRoutes;
