import React, { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

const Header = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-white/5 backdrop-blur-xl shadow-md w-full sticky top-0 z-50">
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src={assets.logo1} alt="" className="w-40" />
        </Link>

        <div className="hidden md:flex font-semibold items-center space-x-8">
          <Link
            to="/"
            className="text-black hover:text-yellow-600 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/assessment"
            className="text-black hover:text-yellow-600 transition-colors duration-300"
          >
            Assessment
          </Link>
          <Link
            to="/colleges"
            className="text-black hover:text-yellow-600 transition-colors duration-300"
          >
            Colleges
          </Link>
          <Link
            to="/about"
            className="text-black hover:text-yellow-600 transition-colors duration-300"
          >
            About
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <img
                  src={
                    user.photoURL ||
                    `https://ui-avatars.com/api/?name=${
                      user.email || user.phoneNumber
                    }&background=random`
                  }
                  alt="User avatar"
                  className="h-10 w-10 rounded-full object-cover border-2 border-yellow-500"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-yellow-600 text-white font-semibold px-5 py-2 rounded-full hover:bg-yellow-700 transition-colors duration-300">
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