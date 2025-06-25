import express from 'express' ;
import { authenticate } from '../middleware/authMiddleware.js';
import { addReview, getProviderReviews } from '../controllers/reviewController.js';
const router = express.Router();

router.post('/create',authenticate,addReview);

router.get('/provider/:id',getProviderReviews);

export default router;
