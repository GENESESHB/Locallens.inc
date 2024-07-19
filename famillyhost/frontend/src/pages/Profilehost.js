import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'; // Added faTimes icon
import './styles/Profilehost.css';

const Profilehost = () => {
  const { user, token, updateUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [serviceMode, setServiceMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    city: user?.city || '',
    profilePicture: null,
    coverPhoto: null
  });

  const [serviceData, setServiceData] = useState({
    stateName: '',
    stateImage: null,
    cityName: '',
    cityImage: null,
    architectHomeName: '',
    architectHomeImage: null,
    eatName: '',
    eatImages: null,
    moroccanDecorationName: '',
    moroccanDecorationImages: null,
    clothingName: '',
    clothingImages: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        city: user.city || '',
        profilePicture: null,
        coverPhoto: null
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleServiceChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setServiceData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setServiceData((prevData) => ({ ...prevData, [name]: value }));
    }
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

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    const serviceDataToSend = new FormData();

    Object.keys(serviceData).forEach(key => {
      if (serviceData[key]) {
        serviceDataToSend.append(key, serviceData[key]);
      }
    });

    // Append user information to serviceDataToSend
    serviceDataToSend.append('userId', user._id);
    serviceDataToSend.append('userName', user.fullName);
    serviceDataToSend.append('profilePicture', user.profilePicture);
    // Log userId and token before making the request
    console.log('userId:', user._id);
    console.log('token:', token);
    console.log('profilePicture', user.profilePicture);
    console.log('smya', user.fullName);
    console.log("data send ", serviceDataToSend);
    try {
      const response = await axios.post('http://localhost:5000/api/user/service', serviceDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Service added:', response.data);
      setServiceMode(false);
    } catch (error) {
      console.error('Service error:', error.response ? error.response.data : error.message);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <img src={`http://localhost:5000/${user.coverPhoto}`} alt="Cover" className="cover-photo" />
      <img src={`http://localhost:5000/${user.profilePicture}`} alt="Profile" className="profile-picture" />
      <div className="name">
        <h1>{user.fullName}</h1>
      </div>
      {editMode ? (
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Save</button>
          <button type="button" className="cancel-button" onClick={() => setEditMode(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </form>
      ) : (
        <div className="info-service-container">
          <div className="infoprs">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
            <p><strong>City:</strong> {user.city}</p>
            <button className='editinfo' onClick={() => setEditMode(true)}>
              Edit information
              <FontAwesomeIcon icon={faPen} style={{ marginLeft: '8px' }} />
            </button>
          </div>
          <div className="add-service-container">
            <FontAwesomeIcon icon={faPlus} className="add-service-icon" />
            <button className='add-service' onClick={() => setServiceMode(true)}>
              Add Service
            </button>
          </div>
        </div>
      )}

      {serviceMode && (
       <div class='suport'>
        <form onSubmit={handleServiceSubmit} className="service-form">
          <div className='containerform'>
            <div>
              <label>
                <img src="path/to/state-name-icon.png" alt="State Name" />
                State Name:
              </label>
              <input type="text" name="stateName" value={serviceData.stateName} onChange={handleServiceChange} required />
            </div>
            <div>
              <label>
                <img src="path/to/state-image-icon.png" alt="State Image" />
                State Image:
              </label>
              <input type="file" name="stateImage" onChange={handleServiceChange} required />
            </div>
            <div>
              <label>
                <img src="path/to/city-name-icon.png" alt="City Name" />
                City Name:
              </label>
              <input type="text" name="cityName" value={serviceData.cityName} onChange={handleServiceChange} required/>
            </div>
            <div>
              <label>
                <img src="path/to/city-image-icon.png" alt="City Image" />
                City Image:
              </label>
              <input type="file" name="cityImage" onChange={handleServiceChange} required/>
            </div>
            <div>
              <label>
                <img src="path/to/architect-home-name-icon.png" alt="Architect's Home Name" />
                Architect's Home Name:
              </label>
              <input type="text" name="architectHomeName" value={serviceData.architectHomeName} onChange={handleServiceChange} required/>
            </div>
            <div>
              <label>
                <img src="path/to/architect-home-image-icon.png" alt="Architect's Home Image" />
                Architect's Home Image:
              </label>
              <input type="file" name="architectHomeImage" onChange={handleServiceChange} required/>
            </div>
            <div>
              <label>
                <img src="path/to/eat-name-icon.png" alt="Eat Name" />
                Eat Name:
              </label>
              <input type="text" name="eatName" value={serviceData.eatName} onChange={handleServiceChange} required/>
            </div>
            <div>
              <label>
                <img src="path/to/eat-images-icon.png" alt="Images of Eat" />
                Images of Eat:
              </label>
              <input type="file" name="eatImages" onChange={handleServiceChange} required/>
            </div>
            <div>
              <label>
                <img src="path/to/moroccan-decoration-name-icon.png" alt="Moroccan Decoration Name" />
                Moroccan Decoration Name:
              </label>
              <input type="text" name="moroccanDecorationName" value={serviceData.moroccanDecorationName} onChange={handleServiceChange} required/>
            </div>
            <div>
              <label>
                <img src="path/to/moroccan-decoration-images-icon.png" alt="Images of Moroccan Decoration" />
                Images of Moroccan Decoration:
              </label>
              <input type="file" name="moroccanDecorationImages" onChange={handleServiceChange} required/>
            </div>
            <div>
              <label>
                <img src="path/to/clothing-name-icon.png" alt="Clothing Name" />
                Clothing Name:
              </label>
              <input type="text" name="clothingName" value={serviceData.clothingName} onChange={handleServiceChange} required/>
            </div>
            <div>
              <label>
                <img src="path/to/clothing-images-icon.png" alt="Images of Clothing" />
                Images of Clothing:
              </label>
              <input type="file" name="clothingImages" onChange={handleServiceChange} required/>
            </div>
            <div className="button-group">
              <button type="submit">Add Service</button>
              <button type="button" className="cancel-button" onClick={() => setServiceMode(false)} required>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        </form>
       </div>
      )}
    </div>
  );
};

export default Profilehost;
