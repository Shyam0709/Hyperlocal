import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import api from "../utils/api";

// Load Stripe publishable key once
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const { bookingId } = useParams(); // assuming route like /payment/:bookingId

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        const res = await api.post("/payments/create-payment-intent", { bookingId });
        const stripe = await stripePromise;
        const { sessionId } = res.data;
        await stripe.redirectToCheckout({ sessionId });
      } catch (err) {
        console.error("Payment error:", err);
        alert("Payment initiation failed");
      }
    };

    if (bookingId) initiatePayment();
  }, [bookingId]);

  return (
    <p className="text-center text-lg mt-10">
      Redirecting to Stripe Checkout...
    </p>
  );
};

export default Payment;
