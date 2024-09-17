import React, { useState, useRef } from 'react';
import VideoView from '../components/view/VideoView';
import ReelsView from '../components/view/ReelsView';
import GalleryImagePost from '../components/view/GalleryImagePost';
import SaharaView from '../components/view/SaharaView'; // Import your Sahara component
import TamazightView from '../components/view/TamazightView'; // Import your Tamazight component
import CelebrationView from '../components/view/CelebrationView'; // Import your Celebration component
import AtlasView from '../components/view/AtlasView'; // Import your Atlas component
import BeachView from '../components/view/BeachView'; // Import your Beach component
import ClothingView from '../components/view/ClothingView'; // Import your Clothing component
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
      case 'sahara':
        return <SaharaView />;
      case 'tamazight':
        return <TamazightView />;
      case 'celebration':
        return <CelebrationView />;
      case 'atlas':
        return <AtlasView />;
      case 'la plage':
        return <BeachView />;
      case 'clothing':
        return <ClothingView />;
      default:
        return <ReelsView />;
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
          <button onClick={() => setView('sahara')} className={view === 'sahara' ? 'active' : ''}>
            Sahara
          </button>
          <button onClick={() => setView('tamazight')} className={view === 'tamazight' ? 'active' : ''}>
            Tamazight Culture
          </button>
          <button onClick={() => setView('celebration')} className={view === 'celebration' ? 'active' : ''}>
            Celebration
          </button>
          <button onClick={() => setView('atlas')} className={view === 'atlas' ? 'active' : ''}>
            Atlas Activities
          </button>
          <button onClick={() => setView('la plage')} className={view === 'la plage' ? 'active' : ''}>
            Beach and Swimming
          </button>
          <button onClick={() => setView('clothing')} className={view === 'clothing' ? 'active' : ''}>
            Traditional Clothing
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
