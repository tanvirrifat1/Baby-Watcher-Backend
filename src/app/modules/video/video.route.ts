import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { VideoController } from './video.controller';
import { uploadMultiple } from '../../../helpers/awsS3';

const router = express.Router();

router.post(
  '/send',
  uploadMultiple,
  auth(USER_ROLES.BABY_SITTER),
  VideoController.sendVideo
);

router.get(
  '/get-my-video',
  auth(USER_ROLES.PARENT),
  VideoController.getMyVideo
);

router.get(
  '/get-video',
  auth(USER_ROLES.BABY_SITTER),
  VideoController.getMyVideosForBabySitter
);

router.patch(
  '/update-video-seen-status/:id',
  auth(USER_ROLES.PARENT),
  VideoController.updateVideoSeenStatus
);

export const VideoRoutes = router;
