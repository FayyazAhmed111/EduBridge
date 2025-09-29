import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoginModal from "../Modal/LoginModal";
import RegisterModal from "../Modal/RegisterModal";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const photo = localStorage.getItem("profilePhoto");
    setIsLoggedIn(loggedIn);
    setProfilePhoto(photo || null);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("profilePhoto");
    setIsLoggedIn(false);
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `relative block px-2 py-1 transition 
     ${isActive ? "font-semibold text-gray-900" : "text-gray-600"} 
     hover:text-black 
     after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-0.5 
     after:bg-blue-600 after:transition-all after:duration-300 
     hover:after:w-full`;

  // 🔄 handle modal switching
  const handleSwitch = (target) => {
    if (target === "login") {
      setShowRegister(false);
      setShowLogin(true);
    }
    if (target === "register") {
      setShowLogin(false);
      setShowRegister(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="flex justify-between items-center px-6 sm:px-10 py-3">
          {/* Logo */}
          <h1
            className="text-lg sm:text-xl font-bold flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span role="img" aria-label="book">
              🎓
            </span>
            <span className="tracking-tight">Edu Bridge</span>
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            {isLoggedIn && (
              <NavLink to="/dashboard" className={linkClass}>
                Dashboard
              </NavLink>
            )}
            <NavLink to="/scholarships" className={linkClass}>
              Opportunities
            </NavLink>
            <NavLink to="/stories" className={linkClass}>
              Success Stories
            </NavLink>
            <NavLink to="/qa" className={linkClass}>
              Q&A
            </NavLink>
            <NavLink to="/aboutus" className={linkClass}>
              About
            </NavLink>
            <NavLink to="/contactus" className={linkClass}>
              Contact
            </NavLink>
          </nav>

          {/* Right Side Desktop */}
          <div
            className="hidden md:flex items-center space-x-3 relative"
            ref={dropdownRef}
          >
            {isLoggedIn ? (
              <>
                <img
                  src={
                    profilePhoto ||
                    "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
                  }
                  alt="Profile"
                  className="w-9 h-9 rounded-full border cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md py-2">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-4 py-1.5 border rounded-full text-sm font-medium hover:bg-gray-100 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowRegister(true)}
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition"
                >
                  Register
                </button>
              </>
            )}
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
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-white border-t shadow-md transition-all duration-300 ${
            menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="flex flex-col space-y-3 px-6 py-4">
            {isLoggedIn && (
              <NavLink
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className={linkClass}
              >
                Dashboard
              </NavLink>
            )}
            <NavLink
              to="/scholarships"
              onClick={() => setMenuOpen(false)}
              className={linkClass}
            >
              Opportunities
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
              Q&A
            </NavLink>
            <NavLink
              to="/aboutus"
              onClick={() => setMenuOpen(false)}
              className={linkClass}
            >
              About
            </NavLink>
            <NavLink
              to="/contactus"
              onClick={() => setMenuOpen(false)}
              className={linkClass}
            >
              Contact
            </NavLink>

            {/* Bottom Section */}
            <div className="pt-3 border-t">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <img
                    src={
                      profilePhoto ||
                      "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full border cursor-pointer"
                    onClick={() => {
                      navigate("/profile");
                      setMenuOpen(false);
                    }}
                  />
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 text-sm text-red-600 border rounded-lg hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setShowLogin(true);
                    }}
                    className="w-full px-4 py-2 border rounded-full text-sm font-medium hover:bg-gray-100 mb-2 transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setShowRegister(true);
                    }}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modals */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitch={handleSwitch}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitch={handleSwitch}
      />
    </>
  );
};

export default Navbar;
