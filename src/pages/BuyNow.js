import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function BuyNowPage() {
    const location = useLocation();
    const { Product_Id, Price, Amount } = location.state || {};

    const [paymentMethod, setPaymentMethod] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [expectedShipmentDate, setExpectedShipmentDate] = useState('');
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const Order_Date = new Date().toISOString().slice(0, 10);
    const Order_Time = new Date().toISOString().slice(0, 19).replace('T', ' ');


    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:3001/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    Order_Date,
                    Amount,
                    Price,
                    Order_Time,
                    Product_Id, // Keep only Product_Id for the backend
                    shippingAddress,
                    paymentMethod,
                    city,
                    state,
                    zipCode,
                    expectedShipmentDate,
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
        <div className="container mt-5">
            <h2 className="text-center mb-4">Buy Now</h2>

            {isOrderPlaced ? (
                <div className="alert alert-success text-center">
                    <h4>Order Placed Successfully!</h4>
                    <p>We will send a confirmation email with your order details shortly.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="card p-4 shadow">
                    <div className="form-group">
                        <label>Payment Method</label>
                        <div className="d-flex gap-3 mt-2">
                            {['Credit Card', 'Debit Card', 'PayPal'].map((method) => (
                                <div className="form-check" key={method}>
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        id={method}
                                        name="payment-method"
                                        value={method}
                                        checked={paymentMethod === method}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    <label className="form-check-label" htmlFor={method}>
                                        {method}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-group mt-3">
                        <label>Shipping Address</label>
                        <textarea
                            className="form-control"
                            value={shippingAddress}
                            onChange={handleInputChange(setShippingAddress)}
                            placeholder="Enter your address"
                            rows="2"
                        ></textarea>
                    </div>

                    <div className="form-group mt-3">
                        <label>City</label>
                        <input
                            className="form-control"
                            type="text"
                            value={city}
                            onChange={handleInputChange(setCity)}
                            placeholder="Enter your city"
                        />
                    </div>

                    <div className="form-group mt-3">
                        <label>State</label>
                        <input
                            className="form-control"
                            type="text"
                            value={state}
                            onChange={handleInputChange(setState)}
                            placeholder="Enter your state"
                        />
                    </div>

                    <div className="form-group mt-3">
                        <label>Zip Code</label>
                        <input
                            className="form-control"
                            type="text"
                            value={zipCode}
                            onChange={handleInputChange(setZipCode)}
                            placeholder="Enter your zip code"
                        />
                    </div>

                    <div className="form-group mt-3">
                        <label>Expected Shipment Date</label>
                        <input
                            className="form-control"
                            type="date"
                            value={expectedShipmentDate}
                            onChange={handleInputChange(setExpectedShipmentDate)}
                        />
                    </div>

                    {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}

                    <button
                        type="submit"
                        className="btn btn-primary w-100 mt-4"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Placing Order...' : 'Place Order'}
                    </button>
                </form>
            )}
        </div>
    );
}

export default BuyNowPage;
