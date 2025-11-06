import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  return (
    <div className="w-16 md:w-1/5 min-h-screen bg-white shadow-lg border-r flex flex-col items-center md:items-start transition-all duration-300">
      <div className="flex flex-col gap-4 pt-8 px-2 md:px-4 w-full">
        {/* Add Item */}
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
              isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <img src={assets.add_icon} alt="add" className="w-6 h-6 mx-auto md:mx-0" />
          <span className="hidden md:block font-medium">Add Items</span>
        </NavLink>

        {/* List Items */}
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
              isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <img src={assets.order_icon} alt="list" className="w-6 h-6 mx-auto md:mx-0" />
          <span className="hidden md:block font-medium">List Items</span>
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/order"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
              isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <img src={assets.order_icon} alt="orders" className="w-6 h-6 mx-auto md:mx-0" />
          <span className="hidden md:block font-medium">Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
