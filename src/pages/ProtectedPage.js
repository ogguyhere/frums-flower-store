import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProtectedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      axios
        .get('http://localhost:3001/auth/protected', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .catch(() => {
          alert('Unauthorized');
          navigate('/login');
        });
    }
  }, [navigate]);
  

  return <div>Protected Content</div>;
}

export default ProtectedPage;
