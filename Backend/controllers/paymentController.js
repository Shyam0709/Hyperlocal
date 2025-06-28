import Stripe from 'stripe';
import dotenv from 'dotenv';
import Booking from '../models/Booking.js';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId).populate("serviceId");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const service = booking.serviceId;
    const priceInPaise = Math.round(service.price * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: {
            name: service.title,
            description: service.description,
          },
          unit_amount: priceInPaise,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
      metadata: {
        bookingId: booking._id.toString(),
        userId: booking.userId.toString(),
      },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe session error:", error);
    res.status(500).json({ message: 'Stripe session creation failed' });
  }
};
