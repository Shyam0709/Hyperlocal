import { useEffect, useState } from "react";
import api from "../utils/api";
import { FaMapMarkerAlt, FaTag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/services/getservices");
        setServices(res.data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-6">
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">
        Explore Hyperlocal Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >
            {service.image && (
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-52 object-cover"
              />
            )}

            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-3 text-sm">
                {service.description}
              </p>

              <div className="flex items-center text-sm text-gray-500 mb-2 gap-2">
                <FaMapMarkerAlt className="text-blue-500" />
                <span>{service.location}</span>
              </div>

              <div className="flex items-center text-sm text-gray-500 mb-4 gap-2">
                <FaTag className="text-green-500" />
                <span>{service.category}</span>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-blue-600">
                  ₹{service.price}
                </p>
                <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition" onClick={() => navigate("/booking")}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
