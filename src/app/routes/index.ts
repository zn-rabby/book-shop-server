import { Router } from 'express';
import userRoutes from '../modules/user/user.route';
import authRoutes from '../modules/auth/auth.route';
import productRouters from '../modules/product/product.route';
import shippingRouters from '../modules/shippingAddress/shippingAddress.route';
import orderRouters from '../modules/order/order.route';
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
  {
    path: '/shipping',
    route: shippingRouters,
  },
  {
    path: '/order',
    route: orderRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
