import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen bg-white shadow-md border-r border-gray-200">
      <div className="flex flex-col gap-4 pt-8 px-6 text-[15px] font-medium">

        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 border border-pink-200
             ${isActive ? 'bg-pink-100 text-rose-600 shadow-md' : 'hover:bg-pink-200'}`
          }
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="Add" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 border border-pink-200
             ${isActive ? 'bg-pink-100 text-rose-600 shadow-md' : 'hover:bg-pink-200'}`
          }
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="List" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 border border-pink-200
             ${isActive ? 'bg-pink-100 text-rose-600 shadow-md' : 'hover:bg-pink-200'}`
          }
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="Orders" />
          <p className="hidden md:block">Orders</p>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;
