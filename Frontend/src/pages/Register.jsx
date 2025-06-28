import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { FaUserAlt, FaLock, FaEnvelope, FaUserTag } from "react-icons/fa";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    role: "user",
  });

  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/request-otp", form);
      alert("OTP sent to your email");
      setShowOtpInput(true);
    } catch (err) {
      alert("Failed to send OTP: " + err.response?.data?.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await api.post("/auth/verify-otp", {
        email: form.email,
        otp,
      });

      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert("OTP verification failed: " + err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 px-4">
      <form
        onSubmit={handleRequestOtp}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-green-600">
          Create Your Hyperlocal Account
        </h2>

        {!showOtpInput ? (
          <>
            <div className="flex items-center border rounded px-3 py-2 mb-3 bg-gray-50">
              <FaUserAlt className="text-gray-400 mr-3" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full bg-transparent focus:outline-none"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2 mb-3 bg-gray-50">
              <FaLock className="text-gray-400 mr-3" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full bg-transparent focus:outline-none"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2 mb-3 bg-gray-50">
              <FaEnvelope className="text-gray-400 mr-3" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full bg-transparent focus:outline-none"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2 mb-3 bg-gray-50">
              <FaUserTag className="text-gray-400 mr-3" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full bg-transparent focus:outline-none"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border p-2 mb-6 rounded bg-gray-50"
            >
              <option value="user">User</option>
              <option value="provider">Provider</option>
            </select>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-semibold"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP sent to your email"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border p-2 mb-4 rounded bg-gray-50"
              required
            />

            <button
              type="button"
              onClick={handleVerifyOtp}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
            >
              Verify OTP & Register
            </button>
          </>
        )}

        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
