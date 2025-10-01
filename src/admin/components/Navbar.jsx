import React from "react";

const Navbar = ({ setIsLoggedIn }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md flex justify-between items-center px-6 py-3">
      <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
        EduBridge Admin Panel
      </h2>
      <button
        onClick={() => setIsLoggedIn(false)}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
      >
        Logout
      </button>
    </header>
  );
};

export default Navbar;
