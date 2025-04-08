import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { NotificationController } from './Notification.controller';

const router = express.Router();

router.get(
  '/get-notification',
  auth(USER_ROLES.BABY_SITTER, USER_ROLES.PARENT),
  NotificationController.getNotificationToDb
);

router.patch(
  '/read-notification',
  auth(USER_ROLES.BABY_SITTER, USER_ROLES.PARENT),
  NotificationController.readNotification
);

router.get(
  '/admin-notification',
  auth(USER_ROLES.ADMIN),
  NotificationController.adminNotificationFromDB
);

router.patch(
  '/admin-read-notification',
  auth(USER_ROLES.ADMIN),
  NotificationController.adminReadNotification
);

router.delete(
  '/delete-all',
  auth(USER_ROLES.ADMIN),
  NotificationController.deleteAllNotifications
);

export const NotificationRoutes = router;
