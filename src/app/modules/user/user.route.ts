import { Router } from 'express';
import { userController } from './user.controller';
const userRoutes = Router();

userRoutes.post(
  '/register',
  //   validateRequest(UserValidation.registerUserValidationSchema),
  userController.register,
);

export default userRoutes;
