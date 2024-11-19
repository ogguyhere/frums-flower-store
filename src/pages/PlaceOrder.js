import React, { useState } from 'react';
import axios from 'axios';

function PlaceOrder({ prefilledOrder }) {
  const [order, setOrder] = useState(prefilledOrder || {
    Order_Date: '',
    Amount: '',
    Price: '',
    Order_Time: '',
    Product_Id: '',
    Customer_Id: '',
  });

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/orders', order)
      .then(() => {
        alert('Order placed successfully!');
      })
      .catch(error => {
        console.error('Error placing order:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" name="Order_Date" value={order.Order_Date} onChange={handleChange} />
      <input type="number" name="Amount" value={order.Amount} onChange={handleChange} placeholder="Amount" />
      <input type="number" name="Price" value={order.Price} onChange={handleChange} placeholder="Price" />
      <input type="time" name="Order_Time" value={order.Order_Time} onChange={handleChange} />
      <input type="number" name="Product_Id" value={order.Product_Id} onChange={handleChange} placeholder="Product ID" />
      <input type="number" name="Customer_Id" value={order.Customer_Id} onChange={handleChange} placeholder="Customer ID" />
      <button type="submit">Place Order</button>
    </form>
  );
}

export default PlaceOrder;
