import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../components/Footer';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import './BookingForm.css'; // Ensure the correct path to your CSS file
import { faArrowDown, faCircleCheck, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Slider settings to show 3 images at a time
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
};

function BookingForm() {
  const { id } = useParams(); // Get id from URL
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    honeypot: ''
  });
  const [errors, setErrors] = useState({});
  const [manualInput, setManualInput] = useState({
    name: false,
    email: false,
    phone: false,
    date: false
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [service, setService] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchServiceAndUserDetails(id);
  }, [id]);

  const fetchServiceAndUserDetails = async (serviceId) => {
    if (!serviceId) {
      console.error('Service ID is not provided');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/product/${serviceId}`);
      if (response.status === 200) {
        const { service, user } = response.data; // Assuming backend sends { service, user }
        setService(service);
        setUser(user);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching service or user details:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setManualInput({ ...manualInput, [name]: true });
    setErrors({ ...errors, [name]: '' });
  };

  const handlePaste = (e) => {
    e.preventDefault();
    alert('Pasting is not allowed. Please type in the field.');
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!formData.name) {
      errors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is not valid';
      isValid = false;
    }
    if (!formData.phone) {
      errors.phone = 'Phone number is required';
      isValid = false;
    }
    if (!formData.date) {
      errors.date = 'Preferred date is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.honeypot) {
      alert('Bot detected!');
      return;
    }

    if (!validateForm()) {
      return;
    }

    if (!Object.values(manualInput).every(Boolean)) {
      alert('Please enter data manually in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/bookings', { ...formData, serviceId: id });
      if (response.status === 200) {
        setSuccessMessage('Booking successful! We will be calling you in 3 hours. Please stay attentive.');
        setFormData({ name: '', email: '', phone: '', date: '', honeypot: '' });
      } else {
        throw new Error('Failed to submit booking');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
    }
  };

  const images = [
    ...(service?.cityImage ? [service.cityImage] : []),
    ...(service?.eatImages || []),
    ...(service?.moroccanDecorationImages || []),
    ...(service?.clothingImages || []),
    ...(service?.architectHomeImage ? [service.architectHomeImage] : [])
  ];
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="booking-form">
      {user && (
        <section className="userwelc">
         <div className='user-info'>
	  <img
            src={`http://localhost:5000/${user.profilePicture}`}
            alt="User Profile"
            className="ppicture"
          />
          <h4><FontAwesomeIcon icon={faCircleCheck} className='ftdon' /> Stay with {user.fullName} in a local home.</h4>
          <h4><FontAwesomeIcon icon={faCircleCheck} className='ftdon1' /> Savor Moroccan cuisine in {user.city}.</h4>
          <h4><FontAwesomeIcon icon={faCircleCheck} className='ftdon' /> Wear traditional {service.clothingName} attire.</h4>
          <h4><FontAwesomeIcon icon={faCircleCheck} className='ftdon1' /> Celebrate local traditions in {service.stateName}.</h4>
	 </div>
   <div className='user-info'>
          <FontAwesomeIcon icon={faHandshake} className='handelsheck'/>
          <h4>living with full security and we support you 24:24 and we garantie to you to do buttervvin </h4>
	 </div>
        </section>
      )}

      <h3 className='bookh3' onClick={scrollToBooking} >Book Now!<FontAwesomeIcon icon={faArrowDown} /></h3>
      {service && (
        <section className="image-slider">
          <Slider {...sliderSettings}>
            {images.map((img, index) => (
              <div key={index} className="slider-item">
                <img src={`http://localhost:5000/${img}`} alt={`Service Image ${index + 1}`} className={`slider-image ${index % 3 === 0 ? 'large' : 'medium'}`} />
              </div>
            ))}
          </Slider>
        </section>
      )}

      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit} id='booking' className='reserve'>
      <h3>Reservation</h3>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          onPaste={handlePaste}
          required
        />
        {errors.name && <p className="error-message">{errors.name}</p>}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          onPaste={handlePaste}
          required
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          onPaste={handlePaste}
          required
        />
        {errors.phone && <p className="error-message">{errors.phone}</p>}

        <label htmlFor="date">Preferred Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          onPaste={handlePaste}
          required
        />
        {errors.date && <p className="error-message">{errors.date}</p>}

        <input type="text" name="honeypot" style={{ display: 'none' }} />

        <button type="submit" className="button-submit">Submit</button>
      </form>
      <Footer />
    </div>
  );
}

export default BookingForm;
