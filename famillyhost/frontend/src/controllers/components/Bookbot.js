import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import './Bookbot.css';

function Bookbot() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (!isExpanded) {
        setIsScrolled(window.scrollY > 50);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isExpanded]);

  const handleClick = () => {
    if (!isExpanded) {
      setScrollPosition(window.scrollY);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsExpanded(true);
    }
  };

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsExpanded(false);
      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }
  };

  const handleBookNow = () => {
    navigate(`/booking-form/${id}`);
  };

  return (
      <header className={`header-booking ${isScrolled ? 'scrolled' : ''} ${isExpanded ? 'expanded' : ''}`}>
        <div onClick={handleBookNow} className="book-now-button">Booking
             <FontAwesomeIcon icon={faArrowRightLong} style={{ marginLeft: '10px'}}/>
        </div>
      </header>
  );
}

export default Bookbot;
