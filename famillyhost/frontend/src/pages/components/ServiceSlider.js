import React from 'react';
import Slider from 'react-slick';
import '../styles/Profilehost.css';

const ServiceSlider = ({ services, handleNavigate }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="service-slider">
      <Slider {...settings}>
        {services.map((service, index) => (
          <div key={index} className="service-item" onClick={() => handleNavigate(service._id)}>
            <img src={`http://localhost:5000/${service.stateImage}`} alt={service.stateName} />
            <h3>{service.stateName}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ServiceSlider;
