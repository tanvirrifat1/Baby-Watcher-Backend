import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { SubscriptionController } from './subscription.controller';
import validateRequest from '../../middlewares/validateRequest';
import { zodSubscriptionSchema } from './subscription.validation';

const router = Router();

router.post(
  '/create',
  auth(USER_ROLES.PARENT),
  validateRequest(zodSubscriptionSchema),
  SubscriptionController.createSusbcription
);

router.post(
  '/update-expired',
  SubscriptionController.updateExpiredSubscriptions
);

router.get(
  '/get-subscription',
  auth(USER_ROLES.PARENT),
  SubscriptionController.getSubscription
);

export const SubscriptionRoutes = router;
