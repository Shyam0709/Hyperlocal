import express from 'express';

import { createBooking,getBookings, updateBookingstatus } from '../controllers/bookingController.js';
import { authenticate } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/createbooking', authenticate, createBooking);
router.get('/getbookings', authenticate, getBookings);
router.patch('/:id/status', authenticate,updateBookingstatus);

export default router;