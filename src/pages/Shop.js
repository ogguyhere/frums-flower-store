import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCardWithPrice from '../components/ProductCardWithPrice'; // Import the product card component
import '../components/App.css'; // Add CSS for better layout
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Corrected import
import { useNavigate } from 'react-router-dom';

function Shop() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await axios.get('http://localhost:3001/products');

        setProducts(response.data);

        console.log('Products fetched successfully:', response.data);

      } catch (error) {

        console.error('Error fetching products:', error);

        toast.error('Failed to fetch products');

      }

    };


    fetchProducts();

  }, []);

  const getCustomerIdFromToken = () => {

    const token = localStorage.getItem('token');

    if (!token) return null;


    const decodedToken = jwtDecode(token);

    const customerId = decodedToken ? decodedToken.Customer_Id : null;

    console.log("Fetched Customer ID from token:", customerId);

    return customerId;

  };

  const handleAddToCart = async (product) => {
    const customerId = getCustomerIdFromToken();

    console.log("Customer ID in Shop: ", customerId);

    if (!customerId) {
      toast.error('You must be logged in to add items to the cart');
      return;
    }

    console.log("Adding to cart:", {
      product_id: product.Product_Id,
      customer_id: customerId,
      quantity: 1,
    });

    try {
      const response = await axios.post('http://localhost:3001/cart', {
        product_id: product.Product_Id,
        customer_id: customerId,
        quantity: 1,
      });
      console.log('Response from server:', response.data);
      toast.success(`${product.Product_Name} has been added to the cart!`);
    } catch (error) {
      console.error('Error adding product to cart:', error);

      // Provide more specific feedback based on the error
      if (error.response && error.response.data) {
        if (error.response.data.code === 'ER_NO_REFERENCED_ROW_2') {
          toast.error('Failed to add product to cart: Customer ID does not exist.');
        } else {
          toast.error('Failed to add product to cart: ' + error.response.data.message);
        }
      } else {
        toast.error('Failed to add product to cart');
      }
    }
  };

  const handleBuyNow = (product) => {
    const amount = 1; // Or you can dynamically calculate it based on user input or state
    const price = product.Price; // The price from the product object

    navigate('/buynow', {
      state: {
        Product_Id: product.Product_Id,
        Price: price,
        Amount: amount,
      }
    });
  };



  return (
    <div>
      <Link to="/cart">Cart</Link> {/* Cart navigation */}
      <div className="products-container">
        {products.map(product => (
          <ProductCardWithPrice
            key={product.Product_Id}
            image={`http://localhost:3001${product.Image_URL}`}
            title={product.Product_Name}
            description={product.Description}
            price={product.Price}
            onAddToCart={() => handleAddToCart(product)}
            onBuyNow={() => handleBuyNow(product)}
          />
        ))}
      </div>
      {/* <ToastContainer/> */}
    </div>
  );
}

export default Shop;
