import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ShippingStatusPage() {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    // Replace with your API to fetch shipments
    axios.get('/api/shipments')
      .then(response => {
        setShipments(response.data);
      })
      .catch(error => {
        console.error('Error fetching shipments:', error);
      });
  }, []);

  return (
    <div className="shipping-status-page">
      <h2>Shipping Status</h2>
      <table>
        <thead>
          <tr>
            <th>Shipment ID</th>
            <th>Expected Date</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.Shipment_Id}>
              <td>{shipment.Shipment_Id}</td>
              <td>{shipment.Expected_Shipment_Date}</td>
              <td>{shipment.Address}</td>
              <td>{shipment.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShippingStatusPage;
