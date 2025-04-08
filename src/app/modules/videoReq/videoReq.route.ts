import express from 'express';
import { VideoReqController } from './videoReq.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.post(
  '/send-req',
  auth(USER_ROLES.PARENT),
  VideoReqController.createVideoReqToDb
);

router.get(
  '/get-req',
  auth(USER_ROLES.BABY_SITTER),
  VideoReqController.getMyVideoReq
);

export const VideoReqRoutes = router;
