import Stripe from 'stripe';
import dotenv from 'dotenv';    
dotenv.config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
import Booking from '../models/Booking.js';
import Service from '../models/Service.js';

export const createPaymentIntent = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const service = await Service.findById(booking.serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    
    const amount = service.price ; 

   
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr',
      metadata: {
        bookingId: booking._id.toString(),
        userId: booking.userId.toString(),
        serviceId: service._id.toString(),
      }
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
      amount: amount, 
      currency: 'inr'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Payment intent creation failed', error: error.message });
  }
};
