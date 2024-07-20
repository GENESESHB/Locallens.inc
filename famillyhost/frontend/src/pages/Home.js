import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/searchbar'; // Ensure the correct path to SearchBar component
import './styles/Home.css'; // Ensure the correct path to your CSS file

const Home = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMediaServices();
  }, []); // Fetch data on component mount

  useEffect(() => {
    // Filter services based on the search term
    setFilteredServices(
      services.filter(service =>
        service.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.stateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.cityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.architectHomeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.eatName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.moroccanDecorationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.clothingName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, services]);

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
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      {/* Render filtered media services */}
      <div className="service-grid">
        {filteredServices.map((service) => (
          <div key={service._id} className="service-card">
            <a href={`/mediad/${service._id}`}>
              <img src={`http://localhost:5000/${service.stateImage}`} alt="Service State Image" />
            </a>
            <div className="service-content">
              <a href={`/mediad/${service._id}`}>
                <h1>{service.stateName}</h1>
              </a>
              <p><strong>City Name:</strong> {service.cityName}</p>
              <p><strong>Architect's Home Name:</strong> {service.architectHomeName}</p>
              <p><strong>Eat Name:</strong> {service.eatName}</p>
              <p><strong>Moroccan Decoration Name:</strong> {service.moroccanDecorationName}</p>
              <p><strong>Clothing Name:</strong> {service.clothingName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
