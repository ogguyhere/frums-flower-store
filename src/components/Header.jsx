import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Ensure the path is correct for your CSS file

function Header({ isAuthenticated, logout }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Store Title */}
        <div className="frums-store-font custom-font-size text-white font-bold text-4xl md:text-5xl transition-transform transform hover:scale-105">
          Frums Flower Store
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/home" className="fancy-button text-white hover:text-yellow-400">Home</Link>
          <Link to="/shop" className="fancy-button text-white hover:text-yellow-400">Shop</Link>
          {isAuthenticated ? (
            <button onClick={logout} className="fancy-button text-white hover:text-yellow-400">Logout</button>
          ) : (
            <Link to="/login" className="fancy-button text-white hover:text-yellow-400">Sign In</Link>
          )}
        </nav>

        {/* Sidebar Toggle Button */}
        <button
          className="text-white text-2xl focus:outline-none"
          onClick={toggleSidebar}
        >
          ☰
        </button>

      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-red-100 text-white shadow-lg z-50 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <span className="text-xl font-bold">Menu</span>
          <button onClick={toggleSidebar} className="text-red-400 hover:text-red-500 text-2xl focus:outline-none">
            ✕
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <Link
            to="/home"
            className="block py-2 px-4 rounded-lg bg-red-800 hover:bg-gray-700 text-white"
            onClick={toggleSidebar}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="block py-2 px-4 rounded-lg bg-red-800 hover:bg-gray-700 text-white"
            onClick={toggleSidebar}
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="block py-2 px-4 rounded-lg bg-red-800 hover:bg-gray-700 text-white"
            onClick={toggleSidebar}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block py-2 px-4 rounded-lg bg-red-800 hover:bg-red-700 text-white"
            onClick={toggleSidebar}
          >
            Contact
          </Link>
          <Link
            to="/cart"
            className="block py-2 px-4 rounded-lg bg-red-800 hover:bg-gray-700 text-white"
            onClick={toggleSidebar}
          >
            Cart
          </Link>
          <Link
            to="/shipping"
            className="block py-2 px-4 rounded-lg bg-red-800 hover:bg-gray-700 text-white"
            onClick={toggleSidebar}
          >
            Shipping
          </Link>
          <Link
            to="/profile"
            className="block py-2 px-4 rounded-lg bg-red-800 hover:bg-gray-700 text-white"
            onClick={toggleSidebar}
          >
            Profile
          </Link>
          {isAuthenticated ? (
            <button
              onClick={() => {
                logout();
                toggleSidebar();
              }}
              className="block py-2 px-4 rounded-lg bg-red-800 hover:bg-gray-700 text-white text-left"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="block py-2 px-4 rounded-lg bg-red-800 hover:bg-gray-700 text-white"
              onClick={toggleSidebar}
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
