import React, { useState } from 'react';

function BuyNowPage() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleShippingAddressChange = (e) => {
    setShippingAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit payment and shipping info (call API or handle logic)
    alert('Order placed successfully!');
  };

  return (
    <div className="buy-now-page">
      <h2>Buy Now</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Payment Method</label>
          <select value={paymentMethod} onChange={handlePaymentMethodChange}>
            <option value="credit-card">Credit Card</option>
            <option value="debit-card">Debit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        <div>
          <label>Shipping Address</label>
          <textarea
            value={shippingAddress}
            onChange={handleShippingAddressChange}
            placeholder="Enter your address here"
          ></textarea>
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default BuyNowPage;
