import { useEffect, useState } from "react";
import api from "../utils/api";
import { CalendarDays, MapPin, User, Package, Clock } from "lucide-react";

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings/getbookings");
        setBookings(res.data);
      } catch (err) {
        console.error("User fetch error:", err);
      }
    };
    fetchBookings();
  }, []);

  const statusColor = {
    confirmed: "text-green-600 bg-green-100",
    pending: "text-yellow-600 bg-yellow-100",
    cancelled: "text-red-600 bg-red-100",
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">📋 My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((b) => {
            const statusClass = statusColor[b.status?.toLowerCase()] || "text-gray-600";
            return (
              <div
                key={b._id}
                className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold flex items-center gap-2 mb-2">
                  <Package className="w-5 h-5 text-blue-500" />
                  {b.serviceId?.title || "Service Title"}
                </h3>

                <p className="flex items-center text-gray-600 mb-1 text-sm">
                  <User className="w-4 h-4 mr-2 text-gray-400" />
                  Provider: {b.providerId?.username || "N/A"}
                </p>

                <p className="flex items-center text-gray-600 mb-1 text-sm">
                  <CalendarDays className="w-4 h-4 mr-2 text-gray-400" />
                  Date: {b.date || "Not set"}
                </p>

                <p className="flex items-center text-gray-600 mb-1 text-sm">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  Time: {b.timeSlot || "N/A"}
                </p>

                <p className="flex items-center text-gray-600 mb-3 text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  Address: {b.address || "N/A"}
                </p>

                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}>
                  {b.status || "Unknown"}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
