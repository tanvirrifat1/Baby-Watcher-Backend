import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { DashboardController } from './dashboard.controller';

const router = express.Router();

router.get(
  '/get-total-statistics',
  auth(USER_ROLES.ADMIN),
  DashboardController.totalStatistics
);

router.get(
  '/recent-transactions',
  // auth(USER_ROLES.ADMIN),
  DashboardController.getRecentTransactions
);

router.get(
  '/all-users',
  // auth(USER_ROLES.ADMIN),
  DashboardController.getAllUsers
);

export const DashboardRoutes = router;
