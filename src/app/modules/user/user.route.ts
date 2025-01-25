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

userRoutes.patch('/role/:userId', userController.userRoleUpdate);
userRoutes.patch('/status/:userId', userController.userStatusUpdate);
userRoutes.patch('/update/:userId', userController.userUpdate);

export default userRoutes;
