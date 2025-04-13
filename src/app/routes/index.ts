import { Router } from 'express';
import userRoutes from '../modules/user/user.route';
import authRoutes from '../modules/auth/auth.route';
import productRouters from '../modules/product/product.route';
import shippingRouters from '../modules/shippingAddress/shippingAddress.route';
import orderRouters from '../modules/order/order.route';
import ContactRouters from '../modules/contact/contact.route';
import { NewsLetterRoutes } from '../modules/newsLetter/newsLetter.route';
import { AnalyticsRoutes } from '../modules/analytics/analytics.route';
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
  {
    path: '/contacts',
    route: ContactRouters,
  },
  {
    path: '/newsletters',
    route: NewsLetterRoutes,
  },
  {
    path: '/analytics',
    route: AnalyticsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
