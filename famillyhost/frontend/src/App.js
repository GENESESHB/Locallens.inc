import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchBar from './components/searchbar';
import Home from './pages/Home';
import Profilehost from './pages/Profilehost';
import About from './pages/About';
import ForgotPassword from './pages/forgot-password';
import ResetPassword from './pages/ResetPassword';
import Register from './pages/Register';
import Experience from './pages/Experience';
import ServiceDetails from './controllers/products';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import BookingForm from './controllers/components/BookingForm';
import PrivateRoute from './routes/privatRoutes';
import './App.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/ResetPassword/:token" element={<ResetPassword />} />
              <Route path="/register" element={<Register />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/login" element={<Login />} />
              <Route path="/product/:id" element={<ServiceDetails />} />
              <Route path="/booking-form/:id" element={<BookingForm />} />
              <Route
                path="/profilehost"
                element={
                  <PrivateRoute>
                    <Profilehost />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
