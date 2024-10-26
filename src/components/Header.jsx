import React from 'react';
import './App.css'; // Ensure the path is correct after moving the CSS file

function Header() {
  return (
    <header className="bg-1 p-6 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left Side Buttons */}
        <nav className="flex items-center">
          <button className="fancy-button mx-2">
            <a href="#home">Home</a>
          </button>
          <button className="fancy-button mx-2">
            <a href="#shop">Shop</a>
          </button>
        </nav>

        {/* Center Title */}
        <div className="frums-store-font custom-font-size text-white font-bold">
          Frums Flower Store
        </div>

        {/* Right Side Navigation Buttons */}
        <nav className="flex items-center">
          <button className="fancy-button mx-2">
            <a href="#services">Services</a>
          </button>
          <button className="fancy-button mx-2">
            <a href="#about">About</a>
          </button>
          <button className="fancy-button mx-2">
            <a href="#contact">Contact</a>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
