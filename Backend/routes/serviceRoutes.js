import express from 'express';
import { getAllServices, createService } from '../controllers/serviceController.js';
import { authenticate } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/create', authenticate, createService);
router.get('/getservices', getAllServices);

export default router;