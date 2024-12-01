import React, { useState } from 'react';
import '../components/App.css'; // You can create a separate CSS file for styles.
import paypal from '../components/paypal.png';
import credit from '../components/credit.png';
import debit from '../components/debit.png';

function BuyNowPage() {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // You should replace these with actual values or calculate them as needed
    const Order_Date = new Date().toISOString(); // Current date in ISO format
    const Amount = 1; // Example amount (you may want to calculate this based on the product)
    const Price = 100; // Example price (replace with actual product price)
    const Order_Time = new Date().toISOString(); // Current time in ISO format
    const Product_Id = 1; // Example product ID (replace with actual product ID)

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleShippingAddressChange = (e) => {
        setShippingAddress(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(''); // Reset the error message

        // Get the token from local storage or wherever you store it
        const token = localStorage.getItem('token');
        const Order_Date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const Order_Time = new Date().toISOString().slice(0, 19).replace('T', ' ');


        try {
            const response = await fetch('http://localhost:3001/api/orders', { // Your API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the token in the headers
                },
                body: JSON.stringify({
                    Order_Date,
                    Amount,
                    Price,
                    Order_Time,
                    Product_Id,
                    shippingAddress, // If you want to include the shipping address in the order
                    paymentMethod, // If you want to include the payment method
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to place order. Please try again.');
            }

            const data = await response.json();
            console.log('Order placed:', data);
            setIsOrderPlaced(true);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="buy-now-container">
            <h2 className="buy-now-title">Buy Now</h2>

            {isOrderPlaced ? (
                <div className="order-confirmation">
                    <h3>Order Placed Successfully!</h3>
                    <p>We will send a confirmation email with your order details shortly.</p>
                    <button className="back-to-home" onClick={() => setIsOrderPlaced(false)}>
                        Back to Shop
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="buy-now-form">
                    <div className="form-group">
                        <label htmlFor="payment-method">Payment Method</label>
                        <div className="payment-method-selector">
                            <input
                                type="radio"
                                id="credit-card"
                                name="payment-method"
                                value="Credit Card"
                                checked={paymentMethod === 'Credit Card'}
                                onChange={handlePaymentMethodChange}
                            />
                            <label htmlFor="credit-card">Credit Card</label>

                            <input
                                type="radio"
                                id="debit-card"
                                name="payment-method"
                                value="Debit Card"
                                checked={paymentMethod === 'Debit Card'}
                                onChange={handlePaymentMethodChange}
                            />
                            <label htmlFor="debit-card">Debit Card</label>

                            <input
                                type="radio"
                                id="paypal"
                                name="payment-method"
                                value="PayPal"
                                checked={paymentMethod === 'PayPal'}
                                onChange={handlePaymentMethodChange}
                            />
                            <label htmlFor="paypal">PayPal</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="shipping-address">Shipping Address</label>
                        <textarea
                            id="shipping-address"
                            value={shippingAddress}
                            onChange={handleShippingAddressChange}
                            placeholder="Enter your address here"
                            className="address-input"
                        ></textarea>
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <button type="submit" className="submit-order-button" disabled={isLoading}>
                        {isLoading ? 'Placing Order...' : 'Place Order'}
                    </button>
                </form>
            )}
        </div>
    );
}

export default BuyNowPage;