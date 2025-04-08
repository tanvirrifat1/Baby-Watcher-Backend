import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { EmergancyContactController } from './emergancyContact.controller';
import { EmergencyContactValidation } from './emergancyContact.validation';

const router = express.Router();

router.post(
  '/create',
  auth(USER_ROLES.PARENT),
  validateRequest(EmergencyContactValidation.emergencyContactValidation),
  EmergancyContactController.createEmergancyContactToDb
);

router.get(
  '/get-my-contacts',
  auth(USER_ROLES.PARENT),
  EmergancyContactController.getMyContactNumber
);

router.delete(
  '/delete/:id',
  auth(USER_ROLES.PARENT),
  EmergancyContactController.deleteMyContactNumber
);

//baby sitter contact number show
router.get(
  '/get-contact',
  auth(USER_ROLES.BABY_SITTER),
  EmergancyContactController.getBabySitterContactNumber
);

router.patch(
  '/update/:id',
  auth(USER_ROLES.PARENT),
  EmergancyContactController.updateContactNumber
);

export const EmergancyContactRoutes = router;
