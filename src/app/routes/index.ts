import { Router } from 'express';
import userRoutes from '../modules/user/user.route';
import authRoutes from '../modules/auth/auth.route';
import productRouters from '../modules/product/product.route';
const router = Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/product',
    route: productRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
