import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-green-50 text-sm mt-auto dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section - Logo & Quote */}
        <div className="mb-6 md:mb-0 text-center">
          <h1 className="text-2xl font-extrabold">
            <span className="text-green-700">Serikali</span>
            <span className="text-black">Map</span>
          </h1>
          <p className="text-green-800 mt-2 text-sm">
            Democracy Starts With Knowing Who Represents You
          </p>
        </div>

        {/* Right Section - Info Links */}
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2 dark:text-gray-200">Info</h2>
          <ul className="space-y-1 ">
            <li>
              <Link
                to="/about"
                className="text-black hover:text-green-700 transition dark:text-gray-300"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-black hover:text-green-700 transition dark:text-gray-300"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="text-black hover:text-green-700 transition dark:text-gray-300"
              >
                Terms and Disclaimer
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider Line */}
      <div className="px-6">
        <div className="border-t-2 border-green-800 w-full mx-auto"></div>
      </div>

      {/* Copyright */}
      <div className="text-center py-4 text-black text-sm dark:text-gray-300">
        © SerikaliMap 2025
      </div>
    </footer>
  );
}
