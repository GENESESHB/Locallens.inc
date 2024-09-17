import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { useAuth } from '../../contexts/AuthContext';
import '../styles/Profilehost.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareShareNodes, faRankingStar, faComments, faHeart, faPen, faEllipsis, faTrash } from '@fortawesome/free-solid-svg-icons';
import avatar from '../../assets/1.png';
import cover from '../../assets/coveruser.png';
import axios from 'axios';
import Marketing from './Marketing';

const ServiceSlider = () => {
  const { user, token } = useAuth();
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchServices = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/user/services/${user._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setServices(response.data);
        } catch (error) {
          console.error('Error fetching services:', error.response ? error.response.data : error.message);
        }
      };

      fetchServices();
    }
  }, [user, token]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  const handleNavigate = (serviceId) => {
    navigate(`/product/${serviceId}`);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (action) => {
    console.log(action);
    setIsOpen(false);
  };

  const handleMarketingClick = () => {
    navigate('/marketing');
  };

  return (
    <div className="sersection">
      {services.map((service, index) => (
        <div key={index} className="sercard">
          <div className="menr" ref={dropdownRef}>
            <button className="drop" onClick={toggleDropdown}>
              <FontAwesomeIcon icon={faEllipsis} />
            </button>
            <div className={`dropdown-ent ${isOpen ? 'show' : ''}`}>
              <button className='actionbtp' onClick={handleMarketingClick}>
                  <FontAwesomeIcon  icon={faRankingStar} />  merketing
              </button>
              <button className="actionbtp" onClick={() => handleLinkClick('edit')}>
                <FontAwesomeIcon icon={faPen} /> Edit
              </button>
              <button className="actionbtp" onClick={() => handleLinkClick('delete')}>
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </div>
          </div>
          <div className="nameuser">
            <img src={`http://localhost:5000/${user.profilePicture || avatar}`} alt="User" className="carousel-image" />
          </div>
          <div className="nameouner">
            <h5>{user.fullName}</h5>
          </div>
          <div className="up">
            <h4>{moment(service.updatedAt).fromNow()}</h4>
          </div>
          <h3>{service.stateName}</h3>
          <div className="carousel-container" onClick={() => handleNavigate(service._id)}>
            <Slider {...settings}>
              <div>
                <img src={`http://localhost:5000/${service.stateImage}`} alt="State" className="carousel-image" />
              </div>
              <div>
                <img src={`http://localhost:5000/${service.cityImage}`} alt="City" className="carousel-image" />
              </div>
              <div>
                <img src={`http://localhost:5000/${service.architectHomeImage}`} alt="Architect's Home" className="carousel-image" />
              </div>
              {service.eatImages?.map((eatImage, idx) => (
                <div key={idx}>
                  <img src={`http://localhost:5000/${eatImage}`} alt={`Eat ${idx + 1}`} className="carousel-image" />
                </div>
              ))}
              {service.moroccanDecorationImages?.map((decorationImage, idx) => (
                <div key={idx}>
                  <img src={`http://localhost:5000/${decorationImage}`} alt={`Decoration ${idx + 1}`} className="carousel-image" />
                </div>
              ))}
              {service.clothingImages?.map((clothingImage, idx) => (
                <div key={idx}>
                  <img src={`http://localhost:5000/${clothingImage}`} alt={`Clothing ${idx + 1}`} className="carousel-image" />
                </div>
              ))}
            </Slider>
          </div>
          <p><strong>City:</strong> {service.cityName}</p>
          <p><strong>Architect's:</strong> {service.architectHomeName}</p>
          <p><strong>Eat:</strong> {service.eatName}</p>
          <p><strong>Decoration:</strong> {service.moroccanDecorationName}</p>
          <p><strong>Clothing:</strong> {service.clothingName}</p>
          <div className="reagir">
            <div className="rg">
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <div className="rg">
              <FontAwesomeIcon icon={faComments} />
            </div>
            <div className="rg">
              <FontAwesomeIcon icon={faSquareShareNodes} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceSlider;
