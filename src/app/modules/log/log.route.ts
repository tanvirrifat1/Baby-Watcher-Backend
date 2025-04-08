import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { LogController } from './log.controller';
import validateRequest from '../../middlewares/validateRequest';
import { LogValidation } from './log.validation';

const router = express.Router();

router.post(
  '/create-log',
  auth(USER_ROLES.PARENT),
  validateRequest(LogValidation.LogSchema),
  LogController.createLog
);

router.get('/get-my-logs', auth(USER_ROLES.PARENT), LogController.getMyLogs);

router.patch(
  '/update/:id',
  validateRequest(LogValidation.updateLogSchema),
  auth(USER_ROLES.PARENT),
  LogController.editLogs
);

router.delete('/delete/:id', auth(USER_ROLES.PARENT), LogController.deleteLog);

router.post('/check', LogController.checkMissedLogs);

export const LogRoutes = router;
