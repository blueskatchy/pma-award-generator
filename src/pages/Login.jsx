import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import pmaImage from "../assets/login_pma.png";
import logo from "../assets/pma_logoicon.png";
import { User, Lock } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid username or password");
        setLoading(false);
        return;
      }

      // Save logged in user
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to dashboard
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Unable to connect to server.");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex overflow-hidden">
      
      {/* Left Image */}
      <div className="hidden md:block w-1/2 h-full relative">
        <img
          src={pmaImage}
          alt="PMA"
          className="w-full h-full object-cover blur-[2px] scale-105"
        />
      </div>

      {/* Login Form */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center bg-gray-100 px-8">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="h-20" />
          </div>

          <h1 className="text-3xl font-bold text-center mb-8">
            Philippine Military Academy Awards
          </h1>

          <form onSubmit={handleLogin}>
            
            {/* Username */}
            <div className="flex items-center bg-white border rounded-lg px-4 py-3 mb-6 shadow-sm">
              <User className="text-gray-400 mr-3" size={20} />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full outline-none bg-transparent"
                required
              />
            </div>

            {/* Password */}
            <div className="flex items-center bg-white border rounded-lg px-4 py-3 mb-6 shadow-sm">
              <Lock className="text-gray-400 mr-3" size={20} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none bg-transparent"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">
                {error}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 disabled:bg-gray-400"
            >
              {loading ? "Logging in..." : "LOG IN"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}