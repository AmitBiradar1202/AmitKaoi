import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center justify-between 
      bg-gradient-to-r from-gray-50 via-white to-gray-100 
      backdrop-blur-md shadow-lg 
      px-6 py-4 sticky top-0 z-50 border-b border-gray-200 transition-all duration-300"
    >
      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <img
          className="w-[max(120px,15%)] object-contain hover:scale-105 transition-transform duration-300 cursor-pointer"
          src={assets.logo1}
          alt="Logo"
        />
        <h1 className="hidden md:block text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent tracking-tight">
          Admin Dashboard
        </h1>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => setToken("")}
        className="bg-gradient-to-r from-black to-gray-800 text-white 
        px-5 py-2 sm:px-6 sm:py-2 rounded-full 
        shadow-md hover:shadow-lg hover:scale-105 
        transition-all duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
