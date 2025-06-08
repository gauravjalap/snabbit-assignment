import React from "react";
import { FiMenu, FiSearch, FiBell, FiAlertCircle } from "react-icons/fi";

const GlobalHeader = ({ setSidebarOpen, isSidebarOpen }) => {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#1a1a1a] text-white shadow-md">
      <div className="flex items-center">
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="text-gray-300 hover:text-white focus:outline-none focus:text-white lg:hidden mr-4"
        >
          <FiMenu size={24} />
        </button>
        <div className="text-xl font-bold">HASS</div>
      </div>

      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FiSearch className="text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-12 py-2 rounded-lg bg-[#303030] text-white placeholder-gray-400 focus:outline-none focus:bg-[#424242]"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <kbd className="inline-flex items-center px-2 py-1 text-xs font-sans text-gray-400 bg-gray-900 rounded border border-gray-500">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3 sm:space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-700">
          <FiAlertCircle size={20} />
        </button>
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-700">
            <FiBell size={20} />
          </button>
          <span className="absolute top-0 right-0 flex items-center justify-center h-5 w-5 bg-red-500 rounded-full text-xs font-bold text-white border-2 border-gray-800">
            2
          </span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer p-1 rounded-lg hover:bg-gray-700">
          <div className="hidden sm:block">
            <div className="text-sm font-medium">John Doe</div>
          </div>
          <img
            className="h-8 w-8 rounded-full"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            alt="User avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;
