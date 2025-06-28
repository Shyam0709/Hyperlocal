import Review from '../models/Review.js';
import Booking from '../models/Booking.js';


export const addReview = async (req, res) => {
  try {
    const { booking, rating, comment } = req.body;
    const userId = req.user._id;
    


    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be 1 to 5' });
    }

    const b = await Booking.findById(booking);
    console.log("Booking.userId:", b.userId.toString());
console.log("JWT user id:", userId);
    if (!b) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // ✅ use correct field: userId
    if (!b.userId || b.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Booking does not belong to user' });
    }

    // ✅ match lowercase status
    if (b.status.toLowerCase() !== 'completed') {
      return res.status(400).json({ message: 'Booking not completed yet' });
    }

    const existingReview = await Review.findOne({ booking });
    if (existingReview) {
      return res.status(400).json({ message: 'You already reviewed this booking' });
    }

    const review = new Review({
      booking,
      user: userId,
      provider: b.providerId,  // ✅ correct field
      rating,
      comment
    });

    await review.save();
    res.json({ message: 'Review added', review });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getProviderReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ provider: req.params.id })
      .populate('user', 'name') // optional: show reviewer name
      .sort({ createdAt: -1 });

    res.json({ reviews });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
