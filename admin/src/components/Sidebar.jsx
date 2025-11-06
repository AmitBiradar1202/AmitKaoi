import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  return (
    <div className="w-full bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-around md:justify-start md:space-x-6 py-4">
          
          {/* Add Items */}
          <NavLink
            to="/add"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <img src={assets.add_icon} alt="add" className="w-5 h-5" />
            <span className="font-medium hidden md:inline">Add Items</span>
          </NavLink>

          {/* List Items */}
          <NavLink
            to="/list"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <img src={assets.order_icon} alt="list" className="w-5 h-5" />
            <span className="font-medium hidden md:inline">List Items</span>
          </NavLink>

          {/* Orders */}
          <NavLink
            to="/order"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <img src={assets.order_icon} alt="orders" className="w-5 h-5" />
            <span className="font-medium hidden md:inline">Orders</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
