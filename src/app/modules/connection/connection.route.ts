import express from 'express';
import { ConnectionController } from './connection.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create',
  auth(USER_ROLES.PARENT, USER_ROLES.BABY_SITTER),
  ConnectionController.createConnection
);

router.get(
  '/get-my-connections',
  auth(USER_ROLES.PARENT, USER_ROLES.BABY_SITTER),
  ConnectionController.getMyConnections
);

router.delete(
  '/delete/:id',
  auth(USER_ROLES.PARENT, USER_ROLES.BABY_SITTER),
  ConnectionController.deleteConnection
);

router.get(
  '/get-connections',
  auth(USER_ROLES.PARENT, USER_ROLES.BABY_SITTER),
  ConnectionController.getBabySitterConnections
);

export const ConnectionRoutes = router;
