import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
      <footer className="bg-gray-900 text-gray-300 text-sm mt-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-12">
          <div>
            <h4 className="text-white text-lg font-bold mb-4">EduBridge</h4>
            <p className="text-gray-400 text-sm">
              Your gateway to scholarships, mentorship, and success stories.  
              Learn without limits.
            </p>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3">Quick Links</h5>
            <ul className="space-y-2">
              <li><a href="/scholarships" className="hover:text-white">Scholarships</a></li>
              <li><a href="/stories" className="hover:text-white">Success Stories</a></li>
              <li><a href="/qa" className="hover:text-white">Q&A / Mentors</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3">Follow Us</h5>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">🌐</a>
              <a href="#" className="hover:text-white">🐦</a>
              <a href="#" className="hover:text-white">📘</a>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 text-xs py-4 border-t border-gray-700">
          © {new Date().getFullYear()} EduBridge. All rights reserved.
        </div>
      </footer>
  );
};

export default Footer;
