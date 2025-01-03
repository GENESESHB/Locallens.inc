import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/searchbar'; // Ensure the correct path to SearchBar component
import './styles/Home.css'; // Ensure the correct path to your CSS file
import Slider from 'react-slick';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faUtensils, faShirt } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(21);

  useEffect(() => {
    fetchMediaServices();
  }, []);

  const fetchMediaServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/services');
      if (response.status === 200) {
        setServices(response.data);
        setFilteredServices(response.data);
      } else {
        console.error('Failed to fetch media services');
      }
    } catch (error) {
      console.error('Error fetching media services:', error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplayOnHover: true,
    autoplaySpeed: 3000,
    //pauseOnHover: true,
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      {/* Render filtered media services */}
      <div className="service-grid">
        {currentServices.map((service, index) => (
          <div key={index} className="service-card">
            <div className="carcontainer">
              <a href={`/product/${service._id}`}>
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
                  {service.eatImages.map((eatImage, idx) => (
                    <div key={idx}>
                      <img src={`http://localhost:5000/${eatImage}`} alt={`Eat ${idx + 1}`} className="carousel-image" />
                    </div>
                  ))}
                  {service.moroccanDecorationImages.map((decorationImage, idx) => (
                    <div key={idx}>
                      <img src={`http://localhost:5000/${decorationImage}`} alt={`Decoration ${idx + 1}`} className="carousel-image" />
                    </div>
                  ))}
                  {service.clothingImages.map((clothingImage, idx) => (
                    <div key={idx}>
                      <img src={`http://localhost:5000/${clothingImage}`} alt={`Clothing ${idx + 1}`} className="carousel-image" />
                    </div>
                  ))}
                </Slider>
              </a>
            </div>
            <p><strong><FontAwesomeIcon icon={faLocationDot} /></strong> explore {service.cityName} enjoy  {service.eatName} and cloathing {service.clothingName}</p>
            {/*>
            <p><strong><FontAwesomeIcon icon={faUtensils} /></strong> {service.eatName}</p>
            <p><strong><FontAwesomeIcon icon={faShirt} /></strong> {service.clothingName}</p>
            <*/}
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredServices.length / servicesPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={index + 1 === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
