import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { path: "/", name: "Dashboard" },
    { path: "/admin/mentors", name: "Mentors" },
    { path: "/admin/students", name: "Students" },
    { path: "/admin/scholarships", name: "Scholarships" },
    { path: "/admin/testimonials", name: "Testimonials" },
    { path: "/admin/settings", name: "Settings" },
  ];

  return (
    <aside className="w-64 bg-blue-600 text-white min-h-screen p-5 space-y-6">
      <h1 className="text-2xl font-bold text-center">EduBridge Admin</h1>
      <nav className="space-y-3">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md font-medium transition ${
                isActive ? "bg-blue-800" : "hover:bg-blue-700"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
