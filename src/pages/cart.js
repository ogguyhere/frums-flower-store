import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartProductCard from '../components/CartProductCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Typography, Divider, Button, TextField } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [shipmentDetails, setShipmentDetails] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [isCheckoutModalOpen, setCheckoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('useEffect triggered');
    const customerId = getCustomerIdFromToken();
    console.log('Customer ID from token:', customerId);

    if (!customerId) {
      toast.error('You must be logged in to view the cart');
      return;
    }

    axios.get(`http://localhost:3001/cart?customer_id=${customerId}`)
      .then((response) => {
        console.log('Cart items fetched:', response.data);
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
        toast.error('Failed to fetch cart data');
        setLoading(false);
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

  const handleCheckout = async () => {
    console.log('Checkout initiated'); // Debugging point
    setCheckoutModalOpen(true);
  };

  const handleConfirmCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
  
    const token = localStorage.getItem('token');
    const customerId = getCustomerIdFromToken();
  
    // Ensure customer is logged in
    if (!customerId || !token) {
      setErrorMessage('You must be logged in to checkout');
      setLoading(false);
      return;
    }
  
    // Validate shipment details
    if (!shipmentDetails.address || !shipmentDetails.city || !shipmentDetails.state || !shipmentDetails.zipCode) {
      setErrorMessage('Please fill in all shipping details');
      setLoading(false);
      return;
    }
  
    try {
      // Place order for each item in the cart
      for (const item of cartItems) {
        const orderPayload = {
          Order_Date: new Date().toISOString().slice(0, 10),
          Amount: item.Quantity,
          Price: item.Price,
          Order_Time: new Date().toISOString().slice(0, 19).replace('T', ' '),
          Product_Id: item['Product_Id'], // Use only Product_Id for backend
          shippingAddress: shipmentDetails.address,
          paymentMethod: 'COD', // Example payment method, change if necessary
          city: shipmentDetails.city,
          state: shipmentDetails.state,
          zipCode: shipmentDetails.zipCode,
          expectedShipmentDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10), // 7 days from now
        };
  
        const response = await fetch('http://localhost:3001/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(orderPayload),
        });
  
        if (!response.ok) {
          throw new Error('Failed to place order. Please try again.');
        }
  
        const data = await response.json();
        console.log('Order placed:', data);
  
        // Remove item from cart after successful order placement
        await handleRemoveItem(item.Cart_id); // Call handleRemoveItem for each item
      }
  
      // Reset the cart and shipment details in the UI
      setCartItems([]);
      setShipmentDetails({ address: '', city: '', state: '', zipCode: '' });
      setCheckoutModalOpen(false);
      setIsOrderPlaced(true);
      toast.success('All items have been ordered and removed from the cart!');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const totalPrice = cartItems.reduce((acc, item) => acc + item.Price * item.Quantity, 0);

  console.log('Total Price:', totalPrice); // Debugging point

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
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
      {isCheckoutModalOpen && (
        <Box sx={{ padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', marginTop: '2rem' }}>
          <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
            Enter Shipping Details
          </Typography>
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            value={shipmentDetails.address}
            onChange={(e) => setShipmentDetails({ ...shipmentDetails, address: e.target.value })}
            sx={{ marginBottom: '1rem' }}
          />
          <TextField
            label="City"
            variant="outlined"
            fullWidth
            value={shipmentDetails.city}
            onChange={(e) => setShipmentDetails({ ...shipmentDetails, city: e.target.value })}
            sx={{ marginBottom: '1rem' }}
          />
          <TextField
            label="State"
            variant="outlined"
            fullWidth
            value={shipmentDetails.state}
            onChange={(e) => setShipmentDetails({ ...shipmentDetails, state: e.target.value })}
            sx={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Zip Code"
            variant="outlined"
            fullWidth
            value={shipmentDetails.zipCode}
            onChange={(e) => setShipmentDetails({ ...shipmentDetails, zipCode: e.target.value })}
            sx={{ marginBottom: '1rem' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmCheckout}
          >
            Confirm Checkout
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setCheckoutModalOpen(false)}
            sx={{ marginLeft: '1rem' }}
          >
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Cart;
