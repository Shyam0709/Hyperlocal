import express, { Router } from 'express';
import { login, requestOtp, verifyOtpAndRegister } from '../controllers/authController.js';

const router = Router();

router.post('/request-otp',requestOtp);
router.post('/verify-otp',verifyOtpAndRegister);
router.post('/login', login);

export default router;