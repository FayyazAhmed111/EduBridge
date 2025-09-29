import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand Section */}
          <div>
            <h2 className="text-white text-2xl font-bold mb-3 flex items-center space-x-2">
              <span role="img" aria-label="book">🎓</span>
              <span>Edu Bridge</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering students through mentorship, scholarships, and real success stories — 
              your bridge to academic and professional growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition">🏠 Dashboard</Link></li>
              <li><Link to="/scholarships" className="hover:text-white transition">🎓 Scholarships</Link></li>
              <li><Link to="/stories" className="hover:text-white transition">⭐ Success Stories</Link></li>
              <li><Link to="/qa" className="hover:text-white transition">💬 Q&A / Mentors</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition">ℹ️ About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">📩 Contact Us</Link></li>
              
            </ul>
            <div>
  <h3 className="text-lg font-semibold mb-3">Legal</h3>
  <ul className="space-y-2">
    <li className="text-gray-400 hover:text-white transition cursor-default">
       Privacy Policy
    </li>
    <li className="text-gray-400 hover:text-white transition cursor-default">
       Terms of Service
    </li>
  </ul>
</div>


          </div>

          {/* Newsletter & Social Media */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Stay Connected</h3>
            <p className="text-gray-400 text-sm mb-3">
              Subscribe for updates and scholarship alerts.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 rounded-md bg-gray-800 text-gray-200 text-sm flex-grow outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
              >
                Subscribe
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-4 text-lg">
              <a href="#" className="hover:text-blue-500 transition">🌐</a>
              <a href="#" className="hover:text-sky-400 transition">🐦</a>
              <a href="#" className="hover:text-pink-500 transition">📸</a>
              <a href="#" className="hover:text-blue-600 transition">💼</a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Edu Bridge. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            Made with ❤️ by the Edu Bridge Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
