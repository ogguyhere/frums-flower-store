import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReviewPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Replace with your API to fetch reviews
    axios.get('/api/reviews')
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, []);

  return (
    <div className="review-page">
      <h2>Product Reviews</h2>
      <div className="reviews">
        {reviews.map((review) => (
          <div key={review.Review_ID} className="review-card">
            <p><strong>Rating:</strong> {review.Rating} Stars</p>
            <p><strong>Review:</strong> {review.Review_Text}</p>
            <p><strong>Reviewed by:</strong> Customer {review.Customer_Id}</p>
            <p><strong>Date:</strong> {review.Review_Date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewPage;
