import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode'; // Correct import
import { useNavigate } from 'react-router-dom'; // Correct import

function ShippingStatusPage() {
  const [shipments, setShipments] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const customerId = getCustomerIdFromToken();  // Get the logged-in user's ID

    console.log("Customer ID in Shipping Status:", customerId); // Debugging point

    if (!customerId) {
      toast.error('You must be logged in to view your shipping status');
      return;
    }

    // Fetch shipments from the API
    axios.get(`http://localhost:3001/shipments?customer_id=${customerId}`)
      .then(response => {
        console.log('Shipments:', response.data);  // Log the shipments fetched from the server
        setShipments(response.data);
        setError('');
      })
      .catch(error => {
        console.error('Error fetching shipments:', error);
        setError('Failed to fetch shipments');
        toast.error('Failed to fetch shipping status');
      });
  }, []);

  // Function to get customer ID from the token
  const getCustomerIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decodedToken = jwtDecode(token);
    console.log("Decoded Token:", decodedToken);  // Log the decoded token for debugging
    return decodedToken ? decodedToken.Customer_Id : null; // Ensure you're using the correct key
  };

  // Function to format the date to a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',  // E.g., "Mon"
      year: 'numeric',   // E.g., "2024"
      month: 'short',    // E.g., "Jan"
      day: 'numeric'     // E.g., "11"
    });
  };

  return (
    <Box sx={{ padding: '2rem', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '2rem', fontWeight: 'bold' }}>
        Shipping Status
      </Typography>
      {error && <Typography color="error" sx={{ textAlign: 'center' }}>{error}</Typography>}
      {shipments.length === 0 ? (
        <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center' }}>
          No shipments found.
        </Typography>
      ) : (
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell><strong>Shipment ID</strong></TableCell>
              <TableCell><strong>Expected Date</strong></TableCell>
              <TableCell><strong>Address</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shipments.map((shipment) => (
              <TableRow key={shipment.Shipment_Id}>
                <TableCell>{shipment.Shipment_Id}</TableCell>
                <TableCell>{formatDate(shipment.Expected_Shipment_Date)}</TableCell>  {/* Use the formatDate function here */}
                <TableCell>{shipment.Address}</TableCell>
                <TableCell>{shipment.Status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
}

export default ShippingStatusPage;
