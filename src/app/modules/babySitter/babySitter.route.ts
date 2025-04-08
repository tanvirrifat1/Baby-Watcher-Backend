import express from 'express';
import { BabySitterController } from './babySitter.controller';

const router = express.Router();

router.get('/get-all-baby-sitter', BabySitterController.getAllBabySitterUser);

export const BabySitterRoutes = router;
