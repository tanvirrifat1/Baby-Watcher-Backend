import express from 'express';
import { ParentController } from './parent.controller';

const router = express.Router();

router.get('/get-all-parent', ParentController.getAllParentUser);

export const ParentRoutes = router;
