import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Profilehost.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ServiceForm = ({ token, user, setServiceMode, fetchServices }) => {
  const [serviceData, setServiceData] = useState({
    stateName: '',
    cityName: '',
    architectHomeName: '',
    eatName: '',
    moroccanDecorationName: '',
    clothingName: '',
  });

  const [stateImage, setStateImage] = useState(null);
  const [cityImage, setCityImage] = useState(null);
  const [architectHomeImage, setArchitectHomeImage] = useState(null);
  const [eatImages, setEatImages] = useState([]);
  const [moroccanDecorationImages, setMoroccanDecorationImages] = useState(null);
  const [clothingImages, setClothingImages] = useState([]);

  const [errors, setErrors] = useState({}); // State to manage errors

  const handleServiceChange = (e) => {
    const { name, value, files } = e.target;

    // Validate input to ensure it contains a maximum of 10 words
    if (!files) {
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount > 10) {
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: 'This field should contain no more than 10 words.'
        }));
        return; // Stop further input if word count exceeds 10
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: ''
        }));
      }
    }

    if (files) {
      switch (name) {
        case 'stateImage':
          setStateImage(files[0]);
          break;
        case 'cityImage':
          setCityImage(files[0]);
          break;
        case 'architectHomeImage':
          setArchitectHomeImage(files[0]);
          break;
        case 'eatImages':
          setEatImages(files);
          break;
        case 'moroccanDecorationImages':
          setMoroccanDecorationImages(files[0]);
          break;
        case 'clothingImages':
          setClothingImages(files);
          break;
        default:
          break;
      }
    } else {
      setServiceData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();

    // Check for errors before submitting
    const hasErrors = Object.values(errors).some(error => error !== '');
    if (hasErrors) {
      alert('Please fix the errors in the form.');
      return;
    }

    const serviceDataToSend = new FormData();

    Object.keys(serviceData).forEach(key => {
      serviceDataToSend.append(key, serviceData[key]);
    });

    if (stateImage) serviceDataToSend.append('stateImage', stateImage);
    if (cityImage) serviceDataToSend.append('cityImage', cityImage);
    if (architectHomeImage) serviceDataToSend.append('architectHomeImage', architectHomeImage);
    if (eatImages.length > 0) {
      Array.from(eatImages).forEach((file) => {
        serviceDataToSend.append('eatImages', file);
      });
    }
    if (moroccanDecorationImages) serviceDataToSend.append('moroccanDecorationImages', moroccanDecorationImages);
    if (clothingImages.length > 0) {
      Array.from(clothingImages).forEach((file) => {
        serviceDataToSend.append('clothingImages', file);
      });
    }

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
      <div className='containerform'>
        <div>
          <label>State Name:</label>
          <input 
            type="text" 
            name="stateName" 
            value={serviceData.stateName} 
            onChange={handleServiceChange} 
            required 
          />
          {errors.stateName && <span className="error-text">{errors.stateName}</span>}
        </div>
        <div>
          <label>State Image:</label>
          <input type="file" name="stateImage" onChange={handleServiceChange} required />
        </div>
        <div>
          <label>City Name:</label>
          <input 
            type="text" 
            name="cityName" 
            value={serviceData.cityName} 
            onChange={handleServiceChange} 
            required 
          />
          {errors.cityName && <span className="error-text">{errors.cityName}</span>}
        </div>
        <div>
          <label>City Image:</label>
          <input type="file" name="cityImage" onChange={handleServiceChange} required />
        </div>
        <div>
          <label>Architect's Home Name:</label>
          <input 
            type="text" 
            name="architectHomeName" 
            value={serviceData.architectHomeName} 
            onChange={handleServiceChange} 
            required 
          />
          {errors.architectHomeName && <span className="error-text">{errors.architectHomeName}</span>}
        </div>
        <div>
          <label>Architect's Home Image:</label>
          <input type="file" name="architectHomeImage" onChange={handleServiceChange} required />
        </div>
        <div>
          <label>Eat Name:</label>
          <input 
            type="text" 
            name="eatName" 
            value={serviceData.eatName} 
            onChange={handleServiceChange} 
            required 
          />
          {errors.eatName && <span className="error-text">{errors.eatName}</span>}
        </div>
        <div>
          <label>Eat Images:</label>
          <input type="file" name="eatImages" onChange={handleServiceChange} multiple required />
        </div>
        <div>
          <label>Moroccan Decoration Name:</label>
          <input 
            type="text" 
            name="moroccanDecorationName" 
            value={serviceData.moroccanDecorationName} 
            onChange={handleServiceChange} 
            required 
          />
          {errors.moroccanDecorationName && <span className="error-text">{errors.moroccanDecorationName}</span>}
        </div>
        <div>
          <label>Moroccan Decoration Images:</label>
          <input type="file" name="moroccanDecorationImages" onChange={handleServiceChange} required />
        </div>
        <div>
          <label>Clothing Name:</label>
          <input 
            type="text" 
            name="clothingName" 
            value={serviceData.clothingName} 
            onChange={handleServiceChange} 
            required 
          />
          {errors.clothingName && <span className="error-text">{errors.clothingName}</span>}
        </div>
        <div>
          <label>Clothing Images:</label>
          <input type="file" name="clothingImages" onChange={handleServiceChange} multiple required />
        </div>
      </div>
      <div className="button-group">
        <button type="submit" className="add-sr">Add Service</button>
        <button type="button" className="cancel-button" onClick={() => setServiceMode(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;
