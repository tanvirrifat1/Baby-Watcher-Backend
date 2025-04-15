import express from 'express';
import { SleepAlertController } from './sleepAlert.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.post(
  '/send',
  auth(USER_ROLES.BABY_SITTER, USER_ROLES.PARENT),
  SleepAlertController.sendToAlert
);

router.post(
  '/save',
  auth(USER_ROLES.BABY_SITTER, USER_ROLES.PARENT),
  SleepAlertController.saveAlertToDB
);

router.get(
  '/get',
  auth(USER_ROLES.BABY_SITTER, USER_ROLES.PARENT),
  SleepAlertController.getAlert
);

export const SleepAlertRoutes = router;
