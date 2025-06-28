import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { createCheckoutSession } from '../controllers/paymentController.js';
const router = express.Router();



router.post('/create-payment-intent', authenticate,createCheckoutSession);

export default router;