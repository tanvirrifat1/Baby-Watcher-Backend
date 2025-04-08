import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
import { uploadMultiple } from '../../../helpers/awsS3';

const router = express.Router();

router.post(
  '/create-parent',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createParentUser
);

router.post(
  '/create-baby-sitter',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createBabySitterUser
);

router.patch(
  '/update-profile',
  // uploadAwsS3Bucket.single('image'),
  uploadMultiple,
  auth(USER_ROLES.ADMIN, USER_ROLES.PARENT, USER_ROLES.BABY_SITTER),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = UserValidation.updateZodSchema.parse(
        JSON.parse(req.body.data)
      );
    }
    return UserController.updateProfile(req, res, next);
  }
);

router.get(
  '/user',
  auth(USER_ROLES.ADMIN, USER_ROLES.PARENT, USER_ROLES.BABY_SITTER),
  UserController.getUserProfile
);

router.get(
  '/profile',
  auth(USER_ROLES.ADMIN, USER_ROLES.PARENT, USER_ROLES.BABY_SITTER),
  UserController.getUserProfile
);

router.delete('/delete-users', UserController.deleteAllUsers);

export const UserRoutes = router;
