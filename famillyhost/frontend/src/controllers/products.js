import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import axios from 'axios';
import { ColorExtractor } from 'react-color-extractor';
import './styles/product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faCity, faSwatchbook, faSunPlantWilt, faUtensils, faShirt } from '@fortawesome/free-solid-svg-icons';
import Comments from './components/Comments';
import Bookbot from './components/Bookbot';

function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [boxShadowColors, setBoxShadowColors] = useState({});

  useEffect(() => {
    fetchServiceDetails();
  }, [id]);

  const fetchServiceDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/product/${id}`);
      if (response.status === 200) {
        setService(response.data);
      } else {
        throw new Error('Failed to fetch service details');
      }
    } catch (error) {
      console.error('Error fetching service details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleColorChange = (index, colors) => {
    if (colors.length > 0) {
      setBoxShadowColors((prev) => ({
        ...prev,
        [index]: `rgba(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}, 0.6)`,
      }));
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!service) {
    return <p>Service not found</p>;
  }

  const handleBookNow = () => {
    navigate(`/booking-form/${id}`);
  };

  return (
    <main className='service-details'>
      < Bookbot/>
      <section className="service-section">
        <div className="grand-icons">
          <div className="icon-item">
            <FontAwesomeIcon icon={faCity} className="icon" />
            <p>Explore the city {service.cityName}<br />Live with a local family</p>
          </div>
          <div className="icon-item">
            <FontAwesomeIcon icon={faSwatchbook} className="icon" />
            <p>Explore the architecture of {service.architectHomeName}<br />Live with a local family</p>
          </div>
          <div className="icon-item">
            <FontAwesomeIcon icon={faSunPlantWilt} className="icon" />
            <p>Explore Moroccan decoration<br />Live with a local family and discover traditional Moroccan architecture</p>
          </div>
        </div>
        <div className="images-grid">
          <ColorExtractor getColors={(colors) => handleColorChange('city', colors)}>
            <img src={`http://localhost:5000/${service.cityImage}`} alt="City" className="image-medium" style={{ boxShadow: boxShadowColors['city'] ? `0 4px 8px ${boxShadowColors['city']}` : 'none' }} />
          </ColorExtractor>
          <ColorExtractor getColors={(colors) => handleColorChange('architect', colors)}>
            <img src={`http://localhost:5000/${service.architectHomeImage}`} alt="Architect's Home" className="image-medium" style={{ boxShadow: boxShadowColors['architect'] ? `0 4px 8px ${boxShadowColors['architect']}` : 'none' }} />
          </ColorExtractor>
          <ColorExtractor getColors={(colors) => handleColorChange('decoration', colors)}>
            <img src={`http://localhost:5000/${service.moroccanDecorationImages}`} alt="Architect's decoration Home" className="image-medium" style={{ boxShadow: boxShadowColors['decoration'] ? `0 4px 8px ${boxShadowColors['decoration']}` : 'none' }} />
          </ColorExtractor>
        </div>
      </section>
      <section className="service-section">
        <div className="grand-icons">
          <div className="icon-item">
            <FontAwesomeIcon icon={faUtensils} className="icon" />
            <p>Live with a local family and enjoy authentic Moroccan cuisine: {service.eatName}</p>
          </div>
        </div>
        <div className="images-grid">
          {service.eatImages && service.eatImages.map((image, idx) => (
            <ColorExtractor key={idx} getColors={(colors) => handleColorChange(`eat-${idx}`, colors)}>
              <img src={`http://localhost:5000/${image}`} alt={`Dish ${idx + 1}`} className="image-small" style={{ boxShadow: boxShadowColors[`eat-${idx}`] ? `0 4px 8px ${boxShadowColors[`eat-${idx}`]}` : 'none' }} />
            </ColorExtractor>
          ))}
        </div>
      </section>
      <section className="service-section">
        <div className="grand-icons">
             <div className="icon-item">
                <FontAwesomeIcon icon={faShirt} className="icon" />
                <p>Discover Moroccan culture by dressing in traditional clothing like a local. Enjoy the vibrant celebrations and experience the essence of {service.clothingName}.</p>
             </div>
        </div>
        <div className="images-grid">
          {service.clothingImages && service.clothingImages.map((image, idx) => (
            <ColorExtractor key={idx} getColors={(colors) => handleColorChange(`clothing-${idx}`, colors)}>
              <img src={`http://localhost:5000/${image}`} alt={`Clothing ${idx + 1}`} className="image-small" style={{ boxShadow: boxShadowColors[`clothing-${idx}`] ? `0 4px 8px ${boxShadowColors[`clothing-${idx}`]}` : 'none' }} />
            </ColorExtractor>
          ))}
        </div>
      </section>
      <Comments serviceId={id}/>
      <Footer />
    </main>
  );
}

export default ServiceDetails;
