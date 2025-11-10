import React from "react";
import { assets } from "../assets/assets";
import { LogOut, ExternalLink } from "lucide-react";

const Navbar = ({ setToken }) => {
  return (
    <nav
      className="flex items-center justify-between 
      bg-white/80 backdrop-blur-md shadow-md
      border-b border-gray-200 px-6 py-3 
      sticky top-0 z-50 transition-all duration-300"
    >
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-3">
       
        <a href="https://skcollection-admin.vercel.app/" target="_blank" rel="noopener noreferrer">
  <img
    src={assets.SkCollections} 
    alt="Logo"
    className=" cursor-pointer w-12 h-12 object-contain rounded-xl hover:scale-105 transition-transform duration-300"
  />
</a>
        <div className="flex flex-col leading-tight">
          <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent tracking-tight">
            Admin Dashboard
          </h1>
          <span className="text-sm text-gray-500 hidden sm:block">
            Manage your store efficiently
          </span>
        </div>
      </div>

      {/* Center: Link to main site */}
      <a  
        href="https://skcollection.vercel.app"
        target="_blank"
        rel="noreferrer"
        className="hidden sm:flex items-center gap-1 text-gray-700 
        hover:text-black font-medium transition-colors"
      >
        Visit Store
        <ExternalLink size={16} />
      </a>

      {/* Right: Logout Button */}
      <button
        onClick={() => setToken("")}
        className="flex items-center gap-2 bg-gradient-to-r from-gray-900 to-gray-700 
        text-white px-4 py-2 rounded-full text-sm font-medium
        shadow-sm hover:shadow-md hover:scale-105 
        transition-all duration-300"
      >
        <LogOut size={16} />
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
