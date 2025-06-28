import { useEffect, useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { Star } from "lucide-react";

const Review = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [selectedBooking, setSelectedBooking] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchCompletedBookings = async () => {
      try {
        const res = await api.get("/bookings/getbookings");
        const completed = res.data.filter((b) => b.status.toLowerCase() === "completed");
        setBookings(completed);
      } catch (err) {
        console.error("Failed to load bookings:", err);
      }
    };
    fetchCompletedBookings();
  }, []);

  const handleSubmit = async () => {
    if (!selectedBooking || !reviewText || rating < 1 || rating > 5) {
      alert("Please fill all fields and select a valid rating.");
      return;
    }

    try {
      await api.post("/reviews/create", {
        booking: selectedBooking,
        rating,
        comment: reviewText,
      });
      alert("✅ Review submitted successfully!");
      setReviewText("");
      setSelectedBooking("");
      setRating(0);
    } catch (err) {
      alert("❌ Failed to submit review");
      console.error(err);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">Write a Review</h2>

        <label className="block text-gray-700 font-semibold mb-1">Completed Service</label>
        <select
          value={selectedBooking}
          onChange={(e) => setSelectedBooking(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">Select Completed Booking</option>
          {bookings.map((b) => (
            <option key={b._id} value={b._id}>
              {b.serviceId?.title || "Untitled Service"} (by {b.providerId?.username || "Provider"})
            </option>
          ))}
        </select>

        <label className="block text-gray-700 font-semibold mb-1">Rating</label>
        <div className="flex items-center space-x-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`transition-colors ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
            >
              <Star fill={star <= rating ? "currentColor" : "none"} className="w-6 h-6" />
            </button>
          ))}
          <span className="text-sm text-gray-600 ml-2">{rating}/5</span>
        </div>

        <label className="block text-gray-700 font-semibold mb-1">Review</label>
        <textarea
          placeholder="Share your experience..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full border p-3 rounded h-28 mb-4"
        ></textarea>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default Review;
