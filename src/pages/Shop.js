// src/pages/Shop.js
import React, { useEffect, useState } from 'react';
import ProductCardWithPrice from '../components/ProductCardWithPrice';
import axios from 'axios';

function Shop() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data from Node.js server
    axios.get('http://localhost:5000/api/items')
      .then(response => {
        setItems(response.data); // Set fetched items to state
      })
      .catch(error => console.error("Error fetching items:", error));
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 py-16 px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white">Shop Our Beautiful Collection</h1>
        <p className="text-xl text-white mt-4">
          Explore our stunning range of fresh flowers and arrangements. Perfect for every occasion!
        </p>
      </div>

      {/* Render products fetched from the server */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {items.map(item => (
          <ProductCardWithPrice
            key={item.id}
            image={`/path-to-your-image/${item.id}.jpg`} // Set up proper image paths
            title={item.title}
            description={item.description || "A beautiful flower arrangement."}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Shop;
