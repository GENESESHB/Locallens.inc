import React, { useState, useRef } from 'react';
import VideoView from '../components/VideoView';
import ReelsView from '../components/ReelsView';
import GalleryImagePost from '../components/GalleryImagePost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './styles/Experience.css';

const Experience = () => {
  const [view, setView] = useState('gallery');
  const navigationRef = useRef(null);

  const renderView = () => {
    switch (view) {
      case 'video':
        return <VideoView />;
      case 'reels':
        return <ReelsView />;
      case 'gallery':
        return <GalleryImagePost />;
      default:
        return <GalleryImagePost />;
    }
  };

  const scrollLeft = () => {
    navigationRef.current.scrollBy({
      left: -200,
      behavior: 'smooth'
    });
  };

  const scrollRight = () => {
    navigationRef.current.scrollBy({
      left: 200,
      behavior: 'smooth'
    });
  };

  return (
    <div className="experience-page">
      <div className="experience-navigation-wrapper">
        <button className="scroll-btn left" onClick={scrollLeft}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="experience-navigation" ref={navigationRef}>
          <button onClick={() => setView('video')} className={view === 'video' ? 'active' : ''}>
            Videos
          </button>
          <button onClick={() => setView('reels')} className={view === 'reels' ? 'active' : ''}>
            Reels
          </button>
          <button onClick={() => setView('gallery')} className={view === 'gallery' ? 'active' : ''}>
            Gallery
          </button>
          <button onClick={() => setView('video')} className={view === 'video' ? 'active' : ''}>
            Videos
          </button>
          <button onClick={() => setView('reels')} className={view === 'reels' ? 'active' : ''}>
            Reels actuals
          </button>
          <button onClick={() => setView('gallery')} className={view === 'gallery' ? 'active' : ''}>
            Gallery
          </button>
          <button onClick={() => setView('video')} className={view === 'video' ? 'active' : ''}>
            Videos
          </button>
          <button onClick={() => setView('reels')} className={view === 'reels' ? 'active' : ''}>
            Reels
          </button>
          <button onClick={() => setView('gallery')} className={view === 'gallery' ? 'active' : ''}>
            Gallery
          </button>
          {/* Add more buttons as needed */}
        </div>
        <button className="scroll-btn right" onClick={scrollRight}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className="experience-content">
        {renderView()}
      </div>
    </div>
  );
};

export default Experience;
