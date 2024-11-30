import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../components/App.css' // Make sure you import the CSS file

function Profile({ logout }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {  // Fixed function name
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
  
                const response = await axios.get('http://localhost:3001/auth/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log('Response data:', response.data); // Log the response data

                // Set the user data from the response
                setUser(response.data.user);  // Assuming the data contains a user object
            } catch (error) {
                console.error('Error fetching user data:', error.response ? error.response.data : error.message);
            }
        };
  
        fetchUserData();  // Fixed function name
    }, []);
  
    if (!user) {
        return <div>Loading...</div>;
    }
  
    return (
        <div className="profile-container">
            {/* Profile image container */}
            <div className="profile-img-container"></div>
            <h2>{user.firstName} {user.lastName}</h2>
            
            {/* Profile information */}
            <div className="profile-info">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Address:</strong> {user.address}</p>
            </div>
  
            {/* Logout button */}
            <button onClick={logout} className="logout-button">
                Logout
            </button>
        </div>
    );
}

export default Profile;
