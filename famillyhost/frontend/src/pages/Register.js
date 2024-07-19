import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [city, setCity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        setLoading(false);
        setErrorMessage('Passwords do not match.');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        fullName,
        password,
        phoneNumber,
        city,
      });

      setLoading(false);
      if (response && response.data) {
        navigate('/login', { state: { message: 'Registration successful. Please verify your email.' } });
      } else {
        throw new Error('No data received from server');
      }
    } catch (error) {
      setLoading(false);
      console.error('Registration error:', error.response);
      setErrorMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Create Your Account</h1>
        <p>Welcome to LocalLens! Before you register as a host, please read the Privacy Policy.</p>
        {loading && <div className="loader"></div>}
        {!loading && (
          <form onSubmit={handleSubmit} className="register-form">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <label>
              <input type="checkbox" required /> I read and approve the Privacy Policy
            </label>
            <button type="submit">Register</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
