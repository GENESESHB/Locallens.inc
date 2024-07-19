import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScaleBalanced, faArrowRightToBracket, faArrowDownWideShort, faInfoCircle, faLock, faUser, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import logo from '../assets/lg.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [activeLink, setActiveLink] = useState('/');
  const dropdownRef = useRef(null); // Create a ref for the dropdown menu

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData && userData.profileImage) {
        setUserImage(userData.profileImage);
      }
    }
  }, []);

  useEffect(() => {
    // Handle clicks outside the dropdown
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

  const handleLinkClick = (path) => {
    setActiveLink(path);
    setIsOpen(false); // Close the dropdown when a link is clicked
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="nav-links">
          <Link
            to="/"
            onClick={() => handleLinkClick('/')}
            className={activeLink === '/' ? 'active' : ''}
          >
             Family Host
          </Link>
          <Link
            to="/experience"
            onClick={() => handleLinkClick('/experience')}
            className={activeLink === '/experience' ? 'active' : ''}
          >
             Experience
          </Link>
        </div>
        <div className="dropdown" ref={dropdownRef}>
          <button className="dropbtn" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faArrowDownWideShort} /> Menu
          </button>
          <div className={`dropdown-content ${isOpen ? 'show' : ''}`}>
            {isLoggedIn ? (
              <Link
                to="/Profilehost"
                onClick={() => handleLinkClick('/Profilehost')}
                className={activeLink === '/profile' ? 'active' : ''}
              >
                <FontAwesomeIcon icon={faUser} className="icon-spacing" /> Profile
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => handleLinkClick('/login')}
                className={activeLink === '/login' ? 'active' : ''}
              >
                <FontAwesomeIcon icon={faArrowRightToBracket} className="icon-spacing" /> Login
              </Link>
            )}
            <Link
              to="/about"
              onClick={() => handleLinkClick('/about')}
              className={activeLink === '/about' ? 'active' : ''}
            >
              <FontAwesomeIcon icon={faInfoCircle} className="icon-spacing" /> About Us
            </Link>
            <Link
              to="/privacy-policy"
              onClick={() => handleLinkClick('/privacy-policy')}
              className={activeLink === '/privacy-policy' ? 'active' : ''}
            >
              <FontAwesomeIcon icon={faScaleBalanced} className="icon-spacing" /> Privacy Policy
            </Link>
          </div>
        </div>
        {isLoggedIn && userImage && (
          <div className="profile-image">
            <img src={userImage} alt="User" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
