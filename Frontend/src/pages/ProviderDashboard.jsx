import { useState, useEffect } from "react";
import api from "../utils/api";
import { BadgeCheck, ClipboardPlus } from "lucide-react";

const ProviderDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings/getbookings");
        setBookings(res.data);
      } catch (err) {
        console.error("Provider fetch error:", err);
      }
    };
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/bookings/${id}/status`, { status: newStatus });
      const updated = bookings.map((b) =>
        b._id === id ? { ...b, status: newStatus } : b
      );
      setBookings(updated);
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const uploadImageToCloudinary = async () => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "unsigned_preset_1");
    formData.append("cloud_name", "dgzevzhuh");
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dgzevzhuh/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    return data.secure_url;
  };

  const handleCreateService = async () => {
    if (!title || !description || !category || !location || !price || !imageFile) {
      return alert("All fields are required");
    }

    try {
      const imageUrl = await uploadImageToCloudinary();

      await api.post("/services/create", {
        title,
        description,
        category,
        location,
        price,
        image: imageUrl,
      });

      alert("✅ Service created successfully!");
      setTitle("");
      setDescription("");
      setCategory("");
      setLocation("");
      setPrice("");
      setImageFile(null);
    } catch (err) {
      alert("Service creation failed.");
      console.error(err);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 flex items-center gap-2">
        <ClipboardPlus className="w-6 h-6" /> Provider Dashboard
      </h2>

      {/* CREATE SERVICE FORM */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-10">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Create a New Service</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded mt-4 w-full"
          rows={4}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="mt-4"
        />
        <button
          onClick={handleCreateService}
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Create Service
        </button>
      </div>

      {/* BOOKINGS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((b) => (
          <div key={b._id} className="bg-white rounded-lg shadow-md p-4">
            <h4 className="text-lg font-bold mb-2 text-gray-800">
              {b.serviceId?.title || "Untitled Service"}
            </h4>
            <p className="text-gray-700"><strong>User:</strong> {b.userId?.name || "N/A"}</p>
            <p className="text-gray-700"><strong>Date:</strong> {new Date(b.date).toLocaleDateString()}</p>
            <p className="text-gray-700"><strong>Time:</strong> {b.timeSlot}</p>
            <p className="text-gray-700"><strong>Address:</strong> {b.address}</p>

            <div className="mt-4 flex justify-between items-center">
              <span className={`text-sm px-2 py-1 rounded font-medium ${
                b.status === "pending" ? "bg-yellow-200 text-yellow-800" :
                b.status === "confirmed" ? "bg-blue-200 text-blue-800" :
                b.status === "completed" ? "bg-green-200 text-green-800" :
                "bg-red-200 text-red-800"
              }`}>
                {b.status.toUpperCase()}
              </span>

              <select
                value={b.status}
                onChange={(e) => handleStatusChange(b._id, e.target.value)}
                className="border px-3 py-1 rounded"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderDashboard;
