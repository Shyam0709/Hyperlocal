import express from 'express';
import Service from '../models/Service.js';
import User from '../models/User.js';
const router = express.Router();

import {
  createService,
  updateService,
  deleteService,
  getAllProviders,
  updateProviderStatus,
  deleteProvider,
  getAllBookings
} from '../controllers/adminController.js';

import authenticate from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/isAdmin.js';

router.get('/users', authenticate, isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Service management
router.post('/services', authenticate, isAdmin, createService);
router.put('/services/:id', authenticate, isAdmin, updateService);
router.delete('/services/:id', authenticate, isAdmin, deleteService);

// Provider management
router.get('/providers', authenticate, isAdmin, getAllProviders);
router.patch('/providers/:id/status', authenticate, isAdmin, updateProviderStatus);
router.delete('/providers/:id', authenticate, isAdmin, deleteProvider);

// Booking management
router.get('/bookings', authenticate, isAdmin, getAllBookings);


import upload from '../middleware/upload.js';

router.post('/services/:id/image', authenticate, isAdmin, upload.single('image'), async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) return res.status(404).json({ message: 'Service not found' });

  service.imageUrl = req.file.path; // Cloudinary gives `path`
  await service.save();

  res.json({ message: 'Image uploaded', imageUrl: service.imageUrl });
});

export default router;
