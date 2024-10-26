import React from 'react';

function Header() {
  return (
    <header className="bg-darkGreen text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Frums Flower Store</h1>
      <nav className="space-x-4">
        <a href="#shop" className="hover:text-purple">Shop</a>
        <a href="#about" className="hover:text-purple">About</a>
        <a href="#contact" className="hover:text-purple">Contact</a>
      </nav>
    </header>
  );
}

export default Header;
