import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { FaUserAlt, FaLock } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });
      const { user, token } = res.data;

      localStorage.setItem("token", token);
      login(user);

      switch (user.role) {
        case "admin":
          navigate("/admin");
          break;
        case "provider":
          navigate("/provider");
          break;
        case "user":
          navigate("/user");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || "Server error"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Welcome to Hyperlocal</h2>

        <div className="mb-4 flex items-center border rounded px-3 py-2 bg-gray-50">
          <FaUserAlt className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-transparent focus:outline-none"
            required
          />
        </div>

        <div className="mb-6 flex items-center border rounded px-3 py-2 bg-gray-50">
          <FaLock className="text-gray-400 mr-3" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent focus:outline-none"
            required
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold">
          Login
        </button>

        <p className="text-center text-sm mt-4 text-gray-600">
          New user?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
