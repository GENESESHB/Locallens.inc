import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styles/Profilehost.css';

const UserInfoForm = ({ user, token, updateUser, setEditMode }) => {
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    city: user?.city || '',
    profilePicture: null,
    coverPhoto: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.put('http://localhost:5000/api/user/profile', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      updateUser(response.data);
      setEditMode(false);
    } catch (error) {
      console.error('Update error:', error.response ? error.response.data : error.message);
    }
  };

  return (
   <div className='service-form'>
    <form onSubmit={handleSubmit} className="infosaver">
      <div>
        <label>Full Name:</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
      </div>
      <div>
        <label>City:</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} />
      </div>
      <div>
        <label>Profile Picture:</label>
        <input type="file" name="profilePicture" onChange={handleChange} />
      </div>
      <div>
        <label>Cover Photo:</label>
        <input type="file" name="coverPhoto" onChange={handleChange} />
      </div>
      <button className='saveinfo' type="submit">Save</button>
      <button type="button" className="cancel-save" onClick={() => setEditMode(false)}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </form>
   </div>
  );
};

export default UserInfoForm;
