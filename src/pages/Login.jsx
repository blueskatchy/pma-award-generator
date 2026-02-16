import React from "react";
import pmaImage from "../assets/login_pma.png";
import logo from "../assets/pma_logoicon.png";
import { User, Lock } from "lucide-react";

export default function Login() {
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
            <img src={logo} alt="Logo" className="h-20" />
          </div>

          <h1 className="text-3xl font-bold text-center mb-8">
            Philippine Military Academy Awards
          </h1>

          <div className="flex items-center bg-white border rounded-lg px-4 py-3 mb-6 shadow-sm">
            <User className="text-gray-400 mr-3" size={20} />
            <input
              type="text"
              placeholder="Username"
              className="w-full outline-none bg-transparent"
            />
          </div>

          <div className="flex items-center bg-white border rounded-lg px-4 py-3 mb-8 shadow-sm">
            <Lock className="text-gray-400 mr-3" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none bg-transparent"
            />
          </div>

          <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300">
            LOG IN
          </button>

        </div>
      </div>
    </div>
  );
}
