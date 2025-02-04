import { Router } from 'express';
import { userController } from './user.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
const userRoutes = Router();

userRoutes.get('/users', auth(USER_ROLE.admin), userController.getAllUsers);

userRoutes.get(
  '/users/:userId',
  auth(USER_ROLE.admin),
  userController.getSingleUsers,
);

userRoutes.patch(
  '/role/:userId',
  auth(USER_ROLE.admin),
  userController.userRoleUpdate,
);

userRoutes.patch(
  '/status/:userId',
  auth(USER_ROLE.admin),
  userController.userStatusUpdate,
);

userRoutes.patch(
  '/update/:userId',
  auth(USER_ROLE.admin),
  userController.userUpdate,
);

userRoutes.delete(
  '/delete/:userId',
  auth(USER_ROLE.admin),
  userController.deleteUser,
);

export default userRoutes;
