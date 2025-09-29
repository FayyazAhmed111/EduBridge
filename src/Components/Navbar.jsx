import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LoginModal from "../Modal/LoginModal";
import RegisterModal from "../Modal/RegisterModal";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const linkClass = ({ isActive }) =>
    `hover:text-black ${
      isActive ? "font-bold text-black" : "font-medium text-gray-600"
    }`;

  return (
    <>
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="flex justify-between items-center px-6 sm:px-8 py-4">
          {/* Logo */}
          <h1 className="text-lg sm:text-xl font-bold flex items-center space-x-2">
            <span role="img" aria-label="book">
              🎓
            </span>
            <span>Edu Bridge</span>
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <NavLink to="/" className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/scholarships" className={linkClass}>
              Available Opportunities
            </NavLink>
            <NavLink to="/stories" className={linkClass}>
              Success Stories
            </NavLink>
            <NavLink to="/qa" className={linkClass}>
              Q&A / Mentors
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              About Us
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setShowLogin(true)}
              className="border px-3 py-1 rounded-lg text-sm font-medium hover:bg-gray-100"
            >
              Login
            </button>
            <button
              onClick={() => setShowRegister(true)}
              className="bg-black text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-gray-900"
            >
              Register
            </button>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 border rounded-lg"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-3 px-6 pb-4 border-t bg-white">
            <NavLink to="/" onClick={() => setMenuOpen(false)} className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink
              to="/scholarships"
              onClick={() => setMenuOpen(false)}
              className={linkClass}
            >
              Available Opportunities
            </NavLink>
            <NavLink
              to="/stories"
              onClick={() => setMenuOpen(false)}
              className={linkClass}
            >
              Success Stories
            </NavLink>
            <NavLink
              to="/qa"
              onClick={() => setMenuOpen(false)}
              className={linkClass}
            >
              Q&A / Mentors
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setMenuOpen(false)}
              className={linkClass}
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className={linkClass}
            >
              Contact
            </NavLink>

            {/* Bottom Section */}
            <div className="pt-3 border-t">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setShowLogin(true);
                }}
                className="border w-full px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 mb-2"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setShowRegister(true);
                }}
                className="w-full bg-black text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-900"
              >
                Register
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Modals */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} />
    </>
  );
};

export default Navbar;
