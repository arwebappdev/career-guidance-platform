import React from "react";
import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";

const Header = ({ isLoggedIn, user, onLogout }) => {
  return (
    <header className="bg-white shadow-md w-full sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand/Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <FaGraduationCap className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-800">
            CareerConnect
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/assessment" // 👈 Add this link
            className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            Assessment
          </Link>
          <Link
            to="/colleges"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            Colleges
          </Link>
          <Link
            to="/about"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            About
          </Link>
        </div>

        {/* 👉 Conditional Rendering for Login/Profile */}
        <div className="flex items-center space-x-4">
          {isLoggedIn && user ? (
            // --- SHOW USER PROFILE IF LOGGED IN ---
            <div className="flex items-center space-x-4">
              <Link to="/profile">
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="h-10 w-10 rounded-full object-cover border-2 border-blue-500"
                />
              </Link>
              <Link to="/login">
                <button
                  onClick={onLogout}
                  className="bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-full hover:bg-gray-300 transition-colors"
                >
                  Logout
                </button>
              </Link>
            </div>
          ) : (
            // --- SHOW LOGIN BUTTON IF LOGGED OUT -
            <Link to="/login">
              <button className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
