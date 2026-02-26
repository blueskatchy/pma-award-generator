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

  const mockUsers = [
    {
      username: "admin",
      password: "admin123",
      role: "admin",
    },
    {
      username: "officer",
      password: "officer123",
      role: "staff",
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

//     const response = await fetch("/api/login", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ username, password }),
// });

    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="fixed inset-0 flex overflow-hidden">
      <div className="hidden md:block w-1/2 h-full relative">
        <img
          src={pmaImage}
          alt="PMA"
          className="w-full h-full object-cover blur-[2px] scale-105"
        />
      </div>

      <div className="w-full md:w-1/2 h-full flex items-center justify-center bg-gray-100 px-8">
        <div className="w-full max-w-md">

          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="h-35" />
          </div>

          <h1 className="text-3xl font-bold text-center mb-8">
            Philippine Military Academy Awards
          </h1>

          <form onSubmit={handleLogin}>
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

            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
            >
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}