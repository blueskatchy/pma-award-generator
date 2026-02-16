import React from "react";
import pmaImage from "../assets/login_pma.jpg";
import logo from "../assets/pma_logoicon.png";; 
import { User, Lock } from "lucide-react"; 

export default function Login() {
  return (
    <div className="h-screen w-full flex">

      {/* LEFT SIDE IMAGE */}
      <div className="hidden md:block w-1/2 h-full">
        <img
          src={pmaImage}
          alt="PMA"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT SIDE LOGIN */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 px-8">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="h-24" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-center mb-8">
            Philippine Military Academy Awards
          </h1>

          {/* Username */}
          <div className="flex items-center bg-white border rounded-lg px-4 py-3 mb-6">
            <User className="text-gray-400 mr-3" size={20} />
            <input
              type="text"
              placeholder="Username"
              className="w-full outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-white border rounded-lg px-4 py-3 mb-8">
            <Lock className="text-gray-400 mr-3" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none"
            />
          </div>

          {/* Button */}
          <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300">
            LOG IN
          </button>

        </div>
      </div>
    </div>
  );
}
