import { useState, useEffect } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CalendarDays, MapPin, Clock, Package } from "lucide-react";

const Booking = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [providerId, setProviderId] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/services/getservices");
        setServices(res.data);
      } catch (err) {
        console.error("Error loading services:", err);
      }
    };
    fetchServices();
  }, []);

  const handleBooking = async () => {
    if (!selectedServiceId || !providerId || !date || !timeSlot || !address) {
      return alert("Please fill all fields.");
    }

    const bookingData = {
      serviceId: selectedServiceId,
      providerId,
      date,
      timeSlot,
      address,
    };

    try {
      const res = await api.post("/bookings/createbooking", bookingData);
      const bookingId = res.data._id;
      navigate(`/payment/${bookingId}`);
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking failed");
    }
  };

  const handleServiceChange = (e) => {
    const serviceId = e.target.value;
    setSelectedServiceId(serviceId);

    const selectedService = services.find((s) => s._id === serviceId);
    if (selectedService?.providerId?._id) {
      setProviderId(selectedService.providerId._id);
    } else {
      setProviderId("");
    }
  };

  const selectedService = services.find((s) => s._id === selectedServiceId);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Book a Service</h2>

        {/* Service selection */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">Select a service</label>
          <div className="flex items-center border rounded px-3">
            <Package className="text-gray-400 mr-2" />
            <select
              value={selectedServiceId}
              onChange={handleServiceChange}
              className="w-full py-2 outline-none"
            >
              <option value="">Choose a service</option>
              {services.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.title} - ₹{s.price}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">Select Date</label>
          <div className="flex items-center border rounded px-3">
            <CalendarDays className="text-gray-400 mr-2" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full py-2 outline-none"
            />
          </div>
        </div>

        {/* Time Slot */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">Time Slot</label>
          <div className="flex items-center border rounded px-3">
            <Clock className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="e.g. 10 AM - 12 PM"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full py-2 outline-none"
            />
          </div>
        </div>

        {/* Address */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold text-gray-700">Your Address</label>
          <div className="flex items-center border rounded px-3">
            <MapPin className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Enter full address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full py-2 outline-none"
            />
          </div>
        </div>

        {/* Booking Summary */}
        {selectedService && (
          <div className="bg-gray-50 border rounded-lg p-4 mb-6 text-sm text-gray-700">
            <p><strong>Selected:</strong> {selectedService.title}</p>
            <p><strong>Price:</strong> ₹{selectedService.price}</p>
            <p><strong>Provider:</strong> {selectedService.providerId?.username}</p>
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Time:</strong> {timeSlot}</p>
            <p><strong>Address:</strong> {address}</p>
          </div>
        )}

        {/* Confirm Button */}
        <button
          onClick={handleBooking}
          className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default Booking;
