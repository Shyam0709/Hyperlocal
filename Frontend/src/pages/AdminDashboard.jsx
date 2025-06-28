import { useEffect, useState } from "react";
import api from "../utils/api";
import { Pencil, Trash2, Users, Cog, Building2 } from "lucide-react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCity, setSelectedCity] = useState("All");
  const [editService, setEditService] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, serviceRes] = await Promise.all([
          api.get("/admin/users"),
          api.get("/services/getservices"),
        ]);
        setUsers(userRes.data);
        setServices(serviceRes.data);
        setFilteredServices(serviceRes.data);
      } catch (err) {
        console.error("Admin fetch error:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCity === "All") {
      setFilteredServices(services);
    } else {
      setFilteredServices(
        services.filter((s) => s.location?.toLowerCase() === selectedCity.toLowerCase())
      );
    }
  }, [selectedCity, services]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await api.delete(`/services/delete/${id}`);
      alert("Deleted");
      const updated = services.filter((s) => s._id !== id);
      setServices(updated);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/services/update/${editService._id}`, editService);
      alert("Service updated!");
      setEditService(null);
      setServices((prev) =>
        prev.map((s) => (s._id === editService._id ? editService : s))
      );
    } catch (err) {
      alert("Update failed");
      console.error(err);
    }
  };

  const cities = ["All", ...new Set(services.map((s) => s.location || "Unknown"))];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <button className="flex items-center gap-2 text-blue-700 hover:text-blue-900">
          <Cog size={20} /> Settings
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow rounded p-6 flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-600">Total Users</h4>
            <p className="text-3xl font-bold">{users.length}</p>
          </div>
          <Users size={40} className="text-blue-500" />
        </div>
        <div className="bg-white shadow rounded p-6 flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-600">Total Services</h4>
            <p className="text-3xl font-bold">{services.length}</p>
          </div>
          <Building2 size={40} className="text-green-500" />
        </div>
      </div>

      {/* USERS */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-4">Registered Users</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {users.map((u) => (
            <div
              key={u._id}
              className="bg-white shadow rounded p-4 flex flex-col gap-2 border-l-4 border-blue-400"
            >
              <div className="text-xl font-semibold">{u.name}</div>
              <div className="text-gray-600 text-sm">{u.email}</div>
              <div className="text-sm">
                Role:{" "}
                <span
                  className={`px-2 py-1 rounded text-white ${
                    u.role === "admin"
                      ? "bg-red-500"
                      : u.role === "provider"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {u.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FILTER BY CITY */}
      <div className="mb-4">
        <label className="font-semibold mr-3">Filter by City:</label>
        <select
          className="border rounded px-3 py-1"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {cities.map((city) => (
            <option key={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* SERVICES */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-4">Service Listings</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((s) => (
            <div key={s._id} className="bg-white shadow rounded p-4">
              <h4 className="text-lg font-bold">{s.title}</h4>
              <p className="text-sm text-gray-600 mb-1">{s.description}</p>
              <p className="text-sm">{s.category} | {s.location}</p>
              <p className="text-green-600 font-semibold mt-1">₹{s.price}</p>
              <div className="text-xs text-gray-500 mt-1">
                Provider: {s.providerId?.username}
              </div>
              <div className="mt-3 flex justify-end gap-3">
                <button
                  onClick={() => setEditService(s)}
                  title="Edit"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(s._id)}
                  title="Delete"
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDIT MODAL */}
      {editService && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded shadow w-[400px] space-y-4"
          >
            <h3 className="text-xl font-bold">Edit Service</h3>
            <input
              className="w-full border px-3 py-2 rounded"
              value={editService.title}
              onChange={(e) =>
                setEditService({ ...editService, title: e.target.value })
              }
              placeholder="Title"
            />
            <input
              className="w-full border px-3 py-2 rounded"
              value={editService.category}
              onChange={(e) =>
                setEditService({ ...editService, category: e.target.value })
              }
              placeholder="Category"
            />
            <input
              className="w-full border px-3 py-2 rounded"
              value={editService.location}
              onChange={(e) =>
                setEditService({ ...editService, location: e.target.value })
              }
              placeholder="Location"
            />
            <input
              className="w-full border px-3 py-2 rounded"
              value={editService.price}
              onChange={(e) =>
                setEditService({ ...editService, price: e.target.value })
              }
              placeholder="Price"
              type="number"
            />
            <textarea
              className="w-full border px-3 py-2 rounded"
              value={editService.description}
              onChange={(e) =>
                setEditService({ ...editService, description: e.target.value })
              }
              placeholder="Description"
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditService(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
