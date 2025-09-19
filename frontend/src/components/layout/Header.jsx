import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";

const Header = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuRef = useRef(null);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Animate menu open/close
  useEffect(() => {
    if (menuRef.current) {
      if (isMobileMenuOpen) {
        gsap.fromTo(
          menuRef.current,
          { y: -200, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "bounce.out",
            display: "block",
          }
        );
      } else {
        gsap.to(menuRef.current, {
          y: -200,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            if (menuRef.current) {
              menuRef.current.style.display = "none";
            }
          },
        });
      }
    }
  }, [isMobileMenuOpen]);

  return (
    <header className="bg-white/5 backdrop-blur-xl shadow-md w-full sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 flex justify-between items-center h-16 relative">
        <Link
          to="/"
          className="flex items-center space-x-2"
          onClick={closeMobileMenu}
        >
          <img
            src={assets.logo1}
            alt="Paramarsh Logo"
            className="w-32 sm:w-40"
          />
        </Link>

        {/* Desktop Navigation */}
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
            to="/ebooks"
            className="text-black hover:text-yellow-600 transition-colors duration-300"
          >
            E-books
          </Link>
          <Link
            to="/parents"
            className="text-black hover:text-yellow-600 transition-colors duration-300"
          >
            Parent-Dashboard
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {/* User Profile/Login */}
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
                    onClick={() => {
                      setIsDropdownOpen(false);
                      closeMobileMenu();
                    }}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsDropdownOpen(false);
                      closeMobileMenu();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" onClick={closeMobileMenu}>
              <button className="bg-yellow-600 text-white font-semibold px-5 py-2 rounded-full hover:bg-yellow-700 transition-colors duration-300">
                Login
              </button>
            </Link>
          )}

          {/* Hamburger Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-black focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (always mounted, gsap controls visibility) */}
      <div
        ref={menuRef}
        style={{ display: "none" }}
        className="md:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-xl shadow-lg z-40"
      >
        <div className="flex flex-col items-center space-y-4 py-6 font-semibold">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="text-black hover:text-yellow-600 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/assessment"
            onClick={closeMobileMenu}
            className="text-black hover:text-yellow-600 transition-colors duration-300"
          >
            Assessment
          </Link>
          <Link
            to="/colleges"
            onClick={closeMobileMenu}
            className="text-black hover:text-yellow-600 transition-colors duration-300"
          >
            Colleges
          </Link>
          <Link
            to="/ebooks"
            onClick={closeMobileMenu}
            className="text-black hover:text-yellow-600 transition-colors duration-300"
          >
            E-books
          </Link>
          <Link
            to="/parents"
            onClick={closeMobileMenu}
            className="text-black hover:text-yellow-600 transition-colors duration-300"
          >
            Parent-Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
