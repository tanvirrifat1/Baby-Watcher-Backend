import express from 'express';

import { MessageController } from './message.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.get(
  '/get-message/:id',
  auth(USER_ROLES.BABY_SITTER, USER_ROLES.PARENT, USER_ROLES.ADMIN),
  MessageController.getAllMessages
);

export const MessageRoutes = router;
