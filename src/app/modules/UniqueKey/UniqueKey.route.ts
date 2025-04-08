import express from 'express';

import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { UniqueKeyController } from './UniqueKey.controller';

const router = express.Router();

router.post(
  '/create-key',
  auth(USER_ROLES.PARENT),
  UniqueKeyController.createUniqueKey
);

router.get(
  '/get-key',
  auth(USER_ROLES.PARENT, USER_ROLES.BABY_SITTER),
  UniqueKeyController.getUniqueKey
);

router.patch(
  '/update-key/:id',
  auth(USER_ROLES.PARENT),
  UniqueKeyController.updateUniqueKey
);

export const UniqueKeyRoutes = router;
