// src/components/NavBar.jsx
import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Load theme from localStorage
  useEffect(() => {
  const storedTheme = localStorage.getItem("theme") || "light";
  setTheme(storedTheme);
  if (storedTheme === "dark") {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  }
}, []);

  // Toggle dark/light mode
  const toggleTheme = () => {
  const newTheme = theme === "light" ? "dark" : "light";
  setTheme(newTheme);
  localStorage.setItem("theme", newTheme);

  if (newTheme === "dark") {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  }
};

  return (
    <nav className="bg-green-100 w-full fixed top-0 left-0 z-50">
      <div className=" mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold ml-8">
            <Link to="/">
              <span className="text-green-800 ">Serikali</span>
              <span className="text-black">Map</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center mr-12">
            <a href="/" className="text-gray-800  hover:underline">
              Home
            </a>
            <a href="/maps/counties" className="text-gray-800  hover:underline">
              Maps
            </a>
            <a href="/about" className="text-gray-800 hover:underline">
              About
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-green-300 hover:scale-110 transition"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-gray-800" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>
          </div>

          {/* Mobile Burger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-800 dark:text-gray-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-60" : "max-h-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-3 bg-green-100 dark:bg-gray-800">
          <a
            href="/"
            className="block text-gray-800 dark:text-gray-200 hover:underline"
          >
            Home
          </a>
          <a
            href="/maps/counties"
            className="block text-gray-800 dark:text-gray-200 hover:underline"
          >
            Maps
          </a>
          <a
            href="/about"
            className="block text-gray-800 dark:text-gray-200 hover:underline"
          >
            About
          </a>

          {/* Dark Mode Toggle with Label */}
          <button
            onClick={toggleTheme}
            className="flex items-center space-x-2 p-2 rounded-md bg-green-300"
          >
            {theme === "light" ? (
              <>
                <Moon className="w-5 h-5 text-gray-800" />
                <span className="text-gray-800">Dark Mode</span>
              </>
            ) : (
              <>
                <Sun className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-200">Light Mode</span>
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
