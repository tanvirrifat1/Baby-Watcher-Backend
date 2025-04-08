import express from 'express';
import { InboxController } from './inbox.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.post(
  '/send-message/:id',
  auth(USER_ROLES.ADMIN, USER_ROLES.PARENT, USER_ROLES.BABY_SITTER),
  InboxController.createInboxToDb
);

router.get(
  '/get-inbox',
  auth(USER_ROLES.ADMIN, USER_ROLES.PARENT, USER_ROLES.BABY_SITTER),
  InboxController.getAllInboxs
);

router.delete(
  '/delete-inbox/:id',
  auth(USER_ROLES.ADMIN, USER_ROLES.PARENT, USER_ROLES.BABY_SITTER),
  InboxController.deleteInbox
);

export const InboxRoutes = router;
