import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile({ logout }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details from the server
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.First_Name} {user.Last_Name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Address:</strong> {user.Address}</p>

      <button onClick={logout} className="logout-button">
        Logout
      </button>
    </div>
  );
}

export default Profile;
