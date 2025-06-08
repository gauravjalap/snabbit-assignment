import React from "react";
import {
  FiHome,
  FiBox,
  FiCheckSquare,
  FiSettings,
  FiBarChart2,
  FiUsers,
  FiLayers,
} from "react-icons/fi";

const NavItem = ({ icon, label, active }) => (
  <a
    href="#"
    className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
      active ? "bg-[#fafafa] text-gray-900" : "text-gray-600 hover:bg-gray-200"
    }`}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </a>
);

const Sidebar = ({ isSidebarOpen }) => {
  const navItems = [
    { icon: <FiHome />, label: "Dashboard" },
    { icon: <FiLayers />, label: "Environments" },
    { icon: <FiCheckSquare />, label: "Executions" },
    { icon: <FiSettings />, label: "Configuration" },
    { icon: <FiBarChart2 />, label: "Reports", active: true },
    { icon: <FiUsers />, label: "Administration" },
  ];

  return (
    <aside
      className={`bg-[#e6eaf1] text-gray-800 flex-shrink-0 lg:w-64 lg:block ${
        isSidebarOpen ? "w-64 block absolute lg:relative z-10" : "w-0 hidden"
      } transition-all duration-300 ease-in-out h-full border-r border-gray-200`}
    >
      <div className="p-4">
        <nav className="mt-8 space-y-2">
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              label={item.label}
              active={item.active}
            />
          ))}
        </nav>
      </div>
      <div className="p-4 absolute bottom-0 w-full">
        <NavItem icon={<FiSettings />} label="Settings" />
      </div>
    </aside>
  );
};

export default Sidebar;
