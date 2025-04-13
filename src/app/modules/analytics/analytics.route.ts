import express from 'express';
import { AnalyticsControllers } from './analytics.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/getStats',
  auth(USER_ROLE.admin),
  AnalyticsControllers.getStatsController,
);

export const AnalyticsRoutes = router;
