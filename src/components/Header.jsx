import React from 'react';
import './App.css'; // Ensure the path is correct after moving the CSS file

function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left Side Navigation */}
        <nav className="flex items-center space-x-6">
          <button className="fancy-button text-white hover:text-yellow-400">
            <a href="/">Home</a>
          </button>
          <button className="fancy-button text-white hover:text-yellow-400">
            <a href="/shop">Shop</a>
          </button>
        </nav>

        {/* Center Title */}
        <div className="frums-store-font custom-font-size text-white font-bold text-4xl md:text-5xl transition-transform transform hover:scale-105">
          Frums Flower Store
        </div>

        {/* Right Side Navigation */}
        <nav className="flex items-center space-x-6">
          <button className="fancy-button text-white hover:text-yellow-400">
            <a href="">Services</a>
          </button>
          <button className="fancy-button text-white hover:text-yellow-400">
            <a href="/about">About</a>
          </button>
          <button className="fancy-button text-white hover:text-yellow-400">
            <a href="">Contact</a>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
