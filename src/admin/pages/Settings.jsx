import React from "react";

export default function Settings({ theme, setTheme }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Settings</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4 max-w-md">
        <div>
          <h3 className="font-semibold mb-2">Theme Preference</h3>
          <button
            onClick={() => setTheme("light")}
            className={`px-3 py-1 rounded-md mr-2 ${
              theme === "light" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Light
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`px-3 py-1 rounded-md ${
              theme === "dark" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Dark
          </button>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Account Settings</h3>
          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
