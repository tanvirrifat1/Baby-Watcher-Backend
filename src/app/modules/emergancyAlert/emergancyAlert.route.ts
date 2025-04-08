import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { EmergancyAlertController } from './emergancyAlert.controller';

const router = express.Router();

router.post(
  '/send',
  auth(USER_ROLES.BABY_SITTER),
  EmergancyAlertController.createEmergancyAlertToDb
);

router.get(
  '/get-all',
  auth(USER_ROLES.PARENT),
  EmergancyAlertController.getEmergencyAlerts
);

router.delete(
  '/delete/:id',
  auth(USER_ROLES.PARENT),
  EmergancyAlertController.deleteAlerts
);

export const EmergancyAlertRoutes = router;
