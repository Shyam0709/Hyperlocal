import Service from '../models/Service.js';
import User from '../models/User.js';
import Booking from '../models/Booking.js';

/** ===============================
 *  SERVICE MANAGEMENT
 *  =============================== */

// Create Service
export const createService = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const service = new Service({ name, description, price });
    await service.save();

    res.json({ message: 'Service created', service });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create service' });
  }
};

// Update Service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const service = await Service.findByIdAndUpdate(
      id,
      { name, description, price },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ message: 'Service updated', service });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update service' });
  }
};

// Delete Service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ message: 'Service deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete service' });
  }
};

/** ===============================
 *  PROVIDER MANAGEMENT
 *  =============================== */

// Get All Providers
export const getAllProviders = async (req, res) => {
  try {
    const providers = await User.find({role: 'provider'});
    res.json({ providers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch providers' });
  }
};

// Approve or Deactivate Provider
export const updateProviderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // e.g., "approved" or "inactive"

    const provider = await User.findById(id);
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    provider.status = status;
    await provider.save();

    res.json({ message: `Provider ${status}`, provider });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update provider status' });
  }
};

// Delete Provider
export const deleteProvider = async (req, res) => {
  try {
    const { id } = req.params;

    const provider = await User.findByIdAndDelete(id);
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    res.json({ message: 'Provider deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete provider' });
  }
};

/** ===============================
 *  BOOKING MANAGEMENT
 *  =============================== */

// Get All Bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
  .populate({ path: 'userId', model: 'User' })
  .populate({ path: 'providerId', model: 'User' })
  .populate({ path: 'serviceId', model: 'Service' });


    res.json({ bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};
