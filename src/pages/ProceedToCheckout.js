import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProceedToCheckout({ cartItems, onClearCart }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('You must be logged in to proceed with checkout.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      for (const item of cartItems) {
        // Prepare the order data
        const orderData = {
          Product_Id: item.Product_Id,
          Price: item.Price,
          Amount: item.Quantity,
          Order_Date: new Date().toISOString().slice(0, 10),
          Order_Time: new Date().toISOString().slice(0, 19).replace('T', ' '),
          shippingAddress: 'Default Address', // Replace with actual input if needed
          paymentMethod: 'Credit Card', // Replace with actual input if needed
          city: 'Default City', // Replace with actual input if needed
          state: 'Default State', // Replace with actual input if needed
          zipCode: '000000', // Replace with actual input if needed
          expectedShipmentDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10), // 1 week later
        };

        // Create the order
        await axios.post('http://localhost:3001/api/orders', orderData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        // Remove the item from the cart
        await axios.delete(`http://localhost:3001/cart/${item.Cart_Id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        // Update UI for removed items
        toast.success(`Ordered ${item.Product_Name} successfully!`);
      }

      onClearCart(); // Clear the cart UI
      toast.success('All items ordered successfully!');
    } catch (error) {
      console.error('Error during checkout:', error);
      setErrorMessage('Failed to complete the checkout process. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="btn btn-primary"
        disabled={isLoading || cartItems.length === 0}
        onClick={handleCheckout}
      >
        {isLoading ? 'Processing Checkout...' : 'Proceed to Checkout'}
      </button>
      {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
    </div>
  );
}

export default ProceedToCheckout;
