import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import UserInfoForm from './components/UserInfoForm';
import ServiceForm from './components/ServiceForm';
import ServiceSlider from './components/ServiceSlider';
import Footer from '../components/Footer';
import './styles/Profilehost.css';
import avatar from '../assets/1.png';
import cover from '../assets/coveruser.png';

const Profilehost = () => {
  const { user, token, updateUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [serviceMode, setServiceMode] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (serviceId) => {
    navigate(`/product/${serviceId}`);
  };

  return (
    <div className="profile-container">
      <img src={user.coverPhoto ? `http://localhost:5000/${user.coverPhoto}` : cover} alt="Cover" className="cover-photo" />
      <img src={user.profilePicture ? `http://localhost:5000/${user.profilePicture}` : avatar} alt="Profile" className="profile-picture" />
      <div className="name">
        <h1>{user.fullName}</h1>
      </div>
      {editMode ? (
        <UserInfoForm
          user={user}
          token={token}
          updateUser={updateUser}
          setEditMode={setEditMode}
        />
      ) : (
        <div className="info-service-container">
          <div className="infoprs">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
            <p><strong>City:</strong> {user.city}</p>
            <button className='editinfo' onClick={() => setEditMode(true)}>
              Edit information
            </button>
          </div>
          <div className="add-service-container">
            <button className='add-service' onClick={() => setServiceMode(true)}>
              Add Service
            </button>
          </div>
        </div>
      )}

      {serviceMode && (
        <ServiceForm
          token={token}
          user={user}
          setServiceMode={setServiceMode}
        />
      )}

      <ServiceSlider />

      <Footer />
    </div>
  );
};

export default Profilehost;
