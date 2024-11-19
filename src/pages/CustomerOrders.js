import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CustomerOrders({ customerId }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/customer-orders/${customerId}`)
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching customer orders:', error);
      });
  }, [customerId]);

  return (
    <div>
      <h1>Customer Orders</h1>
      {orders.map(order => (
        <div key={order.Order_Id}>
          <p>Order Date: {order.Order_Date}</p>
          <p>Amount: {order.Amount}</p>
          <p>Price: {order.Price}</p>
        </div>
      ))}
    </div>
  );
}

export default CustomerOrders;
