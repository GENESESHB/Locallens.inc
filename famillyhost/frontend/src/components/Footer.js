import React from 'react';
import './Footer.css'; // Ensure this path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/lg.png';

const Footer = () => {
  return (
    <footer className="footer" data-section-theme="dark">
      <div className="containerf">
        <div className="row1">
          <div className="col-1-2">
            <img src={logo} alt="Logo" className='imf' />
            <address className="footer-address">
              972 Mission St<br />
              San Francisco, CA<br />
              94103
            </address>
          </div>
          <div className="col-1-2">
            <ul className="social nav">
              <li className="social-item nav-item">
                <a href="https://www.facebook.com/HolbertonSchool/" className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
              </li>
              <li className="social-item nav-item">
                <a href="https://twitter.com/holbertonschool" className="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li className="social-item nav-item">
                <a href="https://www.instagram.com/holbertonschool/" className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="line-divider"/>
        <div className="row2">
          <div className="col-1-2">
            <p className="footer-copyright">© 2024 Locallens.inc, made with ♥ by SE:HassanBOUDRAA.</p>
          </div>
          <div className="col-1-2">
            <ul className="footer-nav">
              <li className="footer-nav-item">
                <a href="/about" className="footer-nav-link">Terms of use</a>
              </li>
              <li className="footer-nav-item">
                <a href="/about" className="footer-nav-link">Privacy Policy</a>
              </li>
              <li className="footer-nav-item">
                <a href="#" className="footer-nav-link">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
