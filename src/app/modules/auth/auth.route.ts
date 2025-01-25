import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './auth.validation';
import { authController } from './auth.controller';
const authRoutes = Router();

authRoutes.post(
  '/register',
  validateRequest(UserValidation.registerUserValidationSchema),
  authController.register,
);

authRoutes.post(
  '/login',
  validateRequest(UserValidation.loginValidationSchema),
  authController.login,
);

export default authRoutes;
