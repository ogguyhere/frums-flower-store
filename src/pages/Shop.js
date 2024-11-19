import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCardWithPrice from '../components/ProductCardWithPrice'; // Import the product card component
import '../components/App.css'; // Add CSS for better layout

function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend
    axios.get('http://localhost:3001/products') // Corrected backend port
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div>
      
      <div className="products-container">
        {products.map(product => (
          <ProductCardWithPrice
            key={product.Product_Id}
            // Dynamically construct the full URL for the image
            image={`http://localhost:3001${product.Image_URL}`} // Prepend backend URL to the image path
            title={product.Product_Name}
            description={product.Description}
            price={product.Price}
          />
        ))}
      </div>
    </div>
  );
}

export default Shop;
