import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Ensure this path is correct
import './Login.css';
import logo from '../assets/lg.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const msg = query.get('message');
    if (msg) {
      setMessage(decodeURIComponent(msg));
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      setLoading(false);
      console.log('Login successful:', response.data);
      setMessage('Login successful');
      const token = response.data.token;
      console.log('Received token:', token); // Debugging
      await login(token); // Set the authentication token in context
      navigate('/Profilehost'); // Redirect to the Controller page
    } catch (error) {
      setLoading(false);
      console.error('Login failed:', error);
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome</h1>
        {message && <p className="message">{message}</p>}
        {loading && <div className="loader"></div>}
        <form onSubmit={handleSubmit} className="login-form">
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
          <button type="submit">Login</button>
        </form>
        <button onClick={() => navigate('/register')} className="register-button">
          Register
        </button>
        <button onClick={handleForgotPassword} className="forgot-password-button">
          Forgot Password
        </button>
      </div>
    </div>
  );
};

export default Login;
