import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/searchbar'; // Ensure the correct path to SearchBar component

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
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.keymarketing.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, services]);

  const fetchMediaServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/mediaservices');
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
              <img src={`http://localhost:5000/uploads/${service.image}`} alt="Service Image" />
            </a>
            <div className="service-content">
              <a href={`/mediad/${service._id}`}>
                <h1>{service.name}</h1>
              </a>
              <p>{service.heading}</p>
              <div className="service-footer">
                <p>{service.keymarketing}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
