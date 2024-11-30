import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/App.css'; // Assuming you're using global styles
import { jwtDecode } from 'jwt-decode';  // Corrected import

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/shop';  // Redirect to shop page if already logged in
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/auth/login', { email, password });

      // Save the token to localStorage
      const token = response.data.token;
      localStorage.setItem('token', token);

      // Decode the token to get the customer_id
      const decodedToken = jwtDecode(token);  // Using jwtDecode for decoding
      console.log('Customer ID:', decodedToken.customer_id); // Optional: You can use it in your app

      // Redirect after successful login
      window.location.href = '/shop';
    } catch (error) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Login</h2>
        
        {error && <p className="error-message">{error}</p>}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit" disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>
        
        <p className="redirect-link">
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
