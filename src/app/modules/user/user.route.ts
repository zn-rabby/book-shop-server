import { Router } from 'express';
import { userController } from './user.controller';
const userRoutes = Router();

userRoutes.get('/users', userController.getAllUsers);

userRoutes.get('/users/:userId', userController.getSingleUsers);

userRoutes.patch('/role/:userId', userController.userRoleUpdate);

userRoutes.patch('/status/:userId', userController.userStatusUpdate);

userRoutes.patch('/update/:userId', userController.userUpdate);

userRoutes.delete('/delete/:userId', userController.deleteUser);

export default userRoutes;
