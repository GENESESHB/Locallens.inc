import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Profilehost.css';

const ServiceForm = ({ token, user, setServiceMode, fetchServices }) => {
  const [serviceData, setServiceData] = useState({
    stateName: '',
    stateImage: null,
    cityName: '',
    cityImage: null,
    architectHomeName: '',
    architectHomeImage: null,
    eatName: '',
    eatImages: [],
    moroccanDecorationName: '',
    moroccanDecorationImages: null,
    clothingName: '',
    clothingImages: [],
    updatedAt: '',
  });

  const handleServiceChange = (e) => {
    const { name, value, files } = e.target;
    setServiceData(prevData => ({
      ...prevData,
      [name]: files ? files : value
    }));
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    const serviceDataToSend = new FormData();

    Object.keys(serviceData).forEach(key => {
      if (serviceData[key]) {
        if (key === 'clothingImages' || key === 'eatImages') {
          Array.from(serviceData[key]).forEach((file) => {
            serviceDataToSend.append(key, file);
          });
        } else {
          serviceDataToSend.append(key, serviceData[key]);
        }
      }
    });

    serviceDataToSend.append('userId', user._id);
    serviceDataToSend.append('userName', user.fullName);
    serviceDataToSend.append('profilePicture', user.profilePicture);

    try {
      await axios.post('http://localhost:5000/api/user/service', serviceDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      setServiceMode(false);
      fetchServices(); // Fetch updated services after submission
    } catch (error) {
      console.error('Service error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleServiceSubmit} className="service-form">
      {/* Form fields for service data */}
      {/* Example: */}
      <div>
        <label>State Name:</label>
        <input type="text" name="stateName" value={serviceData.stateName} onChange={handleServiceChange} required />
      </div>
      {/* Add other fields similarly */}
      <button type="submit">Add Service</button>
    </form>
  );
};

export default ServiceForm;
