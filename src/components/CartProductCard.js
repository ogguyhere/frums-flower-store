import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function CartProductCard({ image, title, description, price, onRemove }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
        margin: '1rem 0',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={image}
          alt={title}
          style={{ width: '100px', height: '100px', borderRadius: '8px', marginRight: '1rem' }}
        />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="h6" sx={{ marginTop: '0.5rem', color: 'green' }}>
            ${price}
          </Typography>
        </Box>
      </Box>
      <Button 
        variant="contained" 
        color="error" 
        onClick={onRemove}
        sx={{ height: 'fit-content', alignSelf: 'flex-start' }}
      >
        Remove
      </Button>
    </Box>
  );
}

export default CartProductCard;
