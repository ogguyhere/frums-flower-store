// src/components/ProductCardWithPrice.js
import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button } from '@mui/material';

function ProductCardWithPrice({ image, title, description, price }) {
  const handleAddToCart = () => {
    alert(`${title} has been added to your cart!`);
  };

  const handleBuyNow = () => {
    // Redirect to PlaceOrder page or initiate order logic
    alert(`Proceeding to buy ${title}.`);
    // Redirect logic can be added here using react-router
  };

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: '#1c1c1c', margin: '1rem' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color="white">
            {title}
          </Typography>
          <Typography variant="body2" color="gray">
            {description}
          </Typography>
          <Typography variant="h6" color="green" className="mt-2">
            ${price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth 
        onClick={handleAddToCart}
        className="mt-4"
      >
        Add to Cart
      </Button>
      <Button 
        variant="contained" 
        color="secondary" 
        fullWidth 
        onClick={handleBuyNow}
        className="mt-2"
      >
        Buy Now
      </Button>
    </Card>
  );
}

export default ProductCardWithPrice;
