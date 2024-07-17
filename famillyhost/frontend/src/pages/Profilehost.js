import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'; // Adjust path as needed

const Profilehost = () => {
  const [user, setUser] = useState(null);
  const { token } = useAuth(); // Retrieve the token from context

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        console.error('Token is not available');
        return;
      }

      try {
        console.log('Token used for request:', token); // Log the token
        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [token]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <p><strong>Full Name:</strong> {user.fullName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
      <p><strong>City:</strong> {user.city}</p>
    </div>
  );
};

export default Profilehost;
