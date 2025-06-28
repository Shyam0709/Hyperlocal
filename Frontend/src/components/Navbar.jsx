// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle, FaTools, FaHome } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-3xl font-bold text-blue-600 flex items-center gap-2">
        <FaHome />
        Hyperlocal
      </Link>

      <div className="flex gap-5 items-center text-md font-medium">
        <Link to="/services" className="text-gray-700 hover:text-blue-600 transition">Services</Link>
        
        {user?.role === "user" && (
          <>
            <Link to="/booking" className="text-gray-700 hover:text-blue-600 transition">Booking</Link>
            <Link to="/review" className="text-gray-700 hover:text-blue-600 transition">Review</Link>
            <Link to="/user" className="text-gray-700 hover:text-blue-600 transition">Dashboard</Link>
          </>
        )}

        {user?.role === "provider" && (
          <Link to="/provider" className="text-gray-700 hover:text-blue-600 transition">Provider Panel</Link>
        )}

        {user?.role === "admin" && (
          <Link to="/admin" className="text-gray-700 hover:text-blue-600 transition">Admin Panel</Link>
        )}

        {!user ? (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">Login</Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-600 transition">Register</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 hover:text-red-700 border border-red-500 px-3 py-1 rounded transition"
          >
            <FiLogOut />
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
