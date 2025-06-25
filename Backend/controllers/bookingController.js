import Booking from '../models/Booking.js';

export const createBooking = async(req,res)=>{
    const { serviceId, date, address } = req.body;
    try {
        const book = await Booking.create({
            serviceId,
            userId: req.user._id, 
            providerId: req.body.providerId, 
            date,
            timeSlot: req.body.timeSlot, 
            address
        });


    } catch (error) {
        res.status(400).json({ message: error.message });
        
    }
}

export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ _id: req.user._id })
            .populate('serviceId')
            .populate('providerId', 'username');
        
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}   

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