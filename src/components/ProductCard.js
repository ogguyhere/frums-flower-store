// src/components/ProductCard.js
import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

function ProductCard({ image, title, description }) {
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: '#1c1c1c' }}>
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
