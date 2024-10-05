import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './ReelsView.css';

const ReelsView = () => {
  const [reels, setReels] = useState([]);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reels');
        setReels(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reels:', err);
        setError('Error fetching reels');
        setLoading(false);
      }
    };

    fetchReels();
  }, []);

  const handleNext = () => {
    setCurrentReelIndex((prevIndex) => (prevIndex + 1) % reels.length);
  };

  const handlePrevious = () => {
    setCurrentReelIndex((prevIndex) => 
      (prevIndex - 1 + reels.length) % reels.length
    );
  };

  const handleVideoEnded = () => {
    handleNext(); // Move to the next reel when the current one ends
  };

  if (loading) return <p>Loading reels...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="reels-view">
      {reels.length > 0 && (
        <div className="reel-item">
          <video
            src={`http://localhost:5000/${reels[currentReelIndex].reelFile}`}
            className="reel-player"
            controls
            autoPlay
            muted // Mute the video to prevent sound
            onEnded={handleVideoEnded} // Trigger the next reel when this one ends
          />
          <div className="reel-info">
            <img
              src={`http://localhost:5000/${reels[currentReelIndex].user.profilePicture}`}
              alt={reels[currentReelIndex].user.fullName}
              className="profile-picturereels"
            />
            <p className="user-namereels">{reels[currentReelIndex].user.fullName}</p>
          </div>
        </div>
      )}
      <div className="navigation-buttons">
        <button onClick={handlePrevious} className="nav-button"><FontAwesomeIcon icon={faChevronLeft} /></button>
        <button onClick={handleNext} className="nav-button"><FontAwesomeIcon icon={faChevronRight} /></button>
      </div>
    </div>
  );
};

export default ReelsView;
