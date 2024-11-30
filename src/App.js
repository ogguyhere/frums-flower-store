import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Login from './pages/Login';
import About from './pages/About';
import Register from './pages/Register';
import Contact from './pages/Contact';
import './components/App.css';
import Cart from './pages/cart'; // Ensure correct case sensitivity
import Profile from './pages/Profile';

function App() {
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <Router>
      <div>
        <Header isAuthenticated={isAuthenticated} logout={logout} />

        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {isAuthenticated ? (
            <Route path="/profile" element={<Profile logout={logout} />} />
          ) : (
            <Route path="/profile" element={<Navigate to="/login" />} />
          )}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
