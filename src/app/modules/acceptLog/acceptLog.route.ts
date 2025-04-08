import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { AcceptLogController } from './acceptLog.controller';

const router = express.Router();

router.get(
  '/get',
  auth(USER_ROLES.BABY_SITTER),
  AcceptLogController.logForBabySitter
);

router.patch(
  '/accept/:id',
  auth(USER_ROLES.BABY_SITTER),
  AcceptLogController.acceptLog
);

export const LogAcceptRoutes = router;
