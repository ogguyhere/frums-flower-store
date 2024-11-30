import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Ensure the path is correct after moving the CSS file

function Header({ isAuthenticated, logout }) {
  return (
    <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left Side Navigation */}
        <nav className="flex items-center space-x-6">
          <button className="fancy-button text-white hover:text-yellow-400">
            <Link to="/home">Home</Link>
          </button>
          <button className="fancy-button text-white hover:text-yellow-400">
            <Link to="/shop">Shop</Link>
          </button>
        </nav>

        {/* Center Title */}
        <div className="frums-store-font custom-font-size text-white font-bold text-4xl md:text-5xl transition-transform transform hover:scale-105">
          Frums Flower Store
        </div>

        {/* Right Side Navigation */}
        <nav className="flex items-center space-x-6">
          <button className="fancy-button text-white hover:text-yellow-400">
            <Link to="/about">About</Link>
          </button>
          <button className="fancy-button text-white hover:text-yellow-400">
            <Link to="/contact">Contact</Link>
          </button>
          <button className="fancy-button text-white hover:text-yellow-400">
            <Link to="/cart">Cart</Link>
          </button>

          {/* Sign In and Logout */}
          {isAuthenticated ? (
            <button
              className="fancy-button text-white hover:text-yellow-400"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <button className="fancy-button text-white hover:text-yellow-400">
              <Link to="/login">Sign In</Link>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
