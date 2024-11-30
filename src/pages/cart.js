import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartProductCard from '../components/CartProductCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Typography, Divider, Button } from '@mui/material';
import { jwtDecode } from 'jwt-decode';  // Corrected import

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const customerId = getCustomerIdFromToken();  // Get the logged-in user's ID

    console.log("Customer ID in Cart:", customerId); // Debugging point

    if (!customerId) {
      toast.error('You must be logged in to view the cart');
      return;
    }

    axios.get(`http://localhost:3001/cart?customer_id=${customerId}`)
      .then(response => {
        console.log('Cart Items:', response.data);  // Log the cart items fetched from the server
        setCartItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
        toast.error('Failed to fetch cart data');
      });
  }, []);

  const getCustomerIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decodedToken = jwtDecode(token);
    console.log("Decoded Token:", decodedToken);  // Log the decoded token for debugging
    return decodedToken ? decodedToken.Customer_Id : null; // Ensure you're using the correct key
  };
  const handleRemoveItem = (cartId) => {
    console.log('Removing item with Cart ID:', cartId); // Log the cart ID
    axios.delete(`http://localhost:3001/cart/${cartId}`)
      .then(() => {
        // Use functional update to ensure you're working with the latest state
        setCartItems(prevItems => prevItems.filter(item => item.Cart_Id !== cartId));
        toast.success('Item removed from cart!');
      })
      .catch(error => {
        console.error('Error removing item:', error);
        toast.error('Failed to remove item from cart.');
      });
  };
  const totalPrice = cartItems.reduce((acc, item) => acc + item.Price * item.Quantity, 0); // Calculate total price

  return (
    <Box sx={{ padding: '2rem', backgroundColor: '#e9e9e9', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '2rem', fontWeight: 'bold' }}>
        My Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center' }}>
          Your cart is empty.
        </Typography>
      ) : (
        <>
          <Box sx={{ marginBottom: '2rem' }}>
            {cartItems.map(item => (
              <CartProductCard
                key={item.Cart_Id}
                image={`http://localhost:3001${item.Image_URL}`} // Ensure Image_URL is correctly set
                title={item.Product_Name} // Ensure Product_Name is available
                description={item.Description} // Ensure Description is available
                price={item.Price} // Ensure Price is available
                quantity={item.Quantity} // Ensure Quantity is available
                onRemove={() => handleRemoveItem(item.Cart_id)}
              />
            ))}
          </Box>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '2rem',
              padding: '1rem',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Total Price: ${totalPrice.toFixed(2)}
            </Typography>
            <Button variant="contained" color="primary">
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Cart;