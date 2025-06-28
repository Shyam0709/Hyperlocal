import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  const { serviceId, providerId, date, timeSlot, address } = req.body;

  try {
    const book = await Booking.create({
      serviceId,
      userId: req.user._id, // From the authenticate middleware
      providerId,
      date,
      timeSlot,
      address,
    });

    // ✅ Send success response
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



export const getBookings = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === 'user') {
      filter = { userId: req.user._id };
    } else if (req.user.role === 'provider') {
      filter = { providerId: req.user._id };
    }

    const bookings = await Booking.find(filter)
      .populate('serviceId')
      .populate('userId', 'name email')
      .populate('providerId', 'username email');
    

    console.log("Bookings fetched for:", req.user.role, req.user._id);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 

export const updateBookingstatus = async(req,res)=>{
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "confirmed", "cancelled","completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    res.json({ message: "Status updated", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }

} 