import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faUtensils, faCity, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './ReelsView.css';

const ReelsView = () => {
  const [reels, setReels] = useState([]);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [services, setServices] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reels');
        const reelsData = response.data;
        setReels(reelsData);
        setLoading(false);

        // Fetch services for each user in reels
        for (const reel of reelsData) {
          const userId = reel.user._id;
          const serviceResponse = await axios.get(`http://localhost:5000/api/user/services/${userId}`);
          setServices(prevServices => ({
            ...prevServices,
            [userId]: serviceResponse.data[0] // Assuming first service from array
          }));
        }
      } catch (err) {
        console.error('Error fetching reels:', err);
        setError('Error fetching reels');
        setLoading(false);
      }
    };

    fetchReels();
  }, []);

  useEffect(() => {
    if (reels.length > 0 && services[reels[currentReelIndex]?.user?._id]) {
      const currentServiceId = services[reels[currentReelIndex]?.user?._id]._id;

      // Fetch comments for the current service
      const fetchComments = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/comments/${currentServiceId}`);
          setComments(response.data);
        } catch (err) {
          console.error('Error fetching comments:', err);
        }
      };

      fetchComments();
    }
  }, [reels, currentReelIndex, services]);

  const handleNext = () => {
    setCurrentReelIndex((prevIndex) => (prevIndex + 1) % reels.length);
  };

  const handlePrevious = () => {
    setCurrentReelIndex((prevIndex) => (prevIndex - 1 + reels.length) % reels.length);
  };

  const handleVideoEnded = () => {
    handleNext();
  };

  if (loading) return <p>Loading reels...</p>;
  if (error) return <p>{error}</p>;

  const currentReel = reels[currentReelIndex];
  const currentService = services[currentReel?.user?._id];

  return (
    <div className="reels-view">
      {currentReel && (
        <div className="reel-item">
          {/* Video Section */}
          <video
            src={`http://localhost:5000/${currentReel.reelFile}`}
            className="reel-player"
            controls
            autoPlay
            muted
            onEnded={handleVideoEnded}
          />
          {/* Reel Info Section */}
          <div className="reel-info">
            <img
              src={`http://localhost:5000/${currentReel.user.profilePicture}`}
              alt={currentReel.user.fullName}
              className="profile-picturereels"
            />
            <p className="user-namereels">{currentReel.user.fullName}</p>
            {currentService && (
              <>
                <button
                  className="reserve-button"
                  onClick={() => window.location.href = `/product/${currentService._id}`}
                >
                  Reservation
                </button>
                {/* Additional Service Information */}
                <div className="service-inforeels">
                  <div className="info-item">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="icon-servicesreels" />
                    <p>{currentService.stateName}</p>
                  </div>
                  <div className="info-item">
                    <FontAwesomeIcon icon={faCity} className="icon-servicesreels" />
                    <p>{currentService.cityName}</p>
                  </div>
                  <div className="info-item">
                    <FontAwesomeIcon icon={faUtensils} className="icon-servicesreels" />
                    <p>{currentService.eatName}</p>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="comments-list-reels">
                  {comments.map((comment) => (
                    <div key={comment._id} className="comment-card-reels">
                      <div className="comment-header-reels">
                        {comment.image && <img src={`http://localhost:5000/uploadscoment/${comment.image}`} alt="Comment" className="comment-image" />}
                        <strong>{comment.name}</strong>
                      </div>
                      <p>{comment.comment}</p>
                      <div className="star-rating-reels">
                        {[...Array(comment.rating)].map((_, i) => (
                          <span key={i} className="star filled">&#9733;</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <button onClick={handlePrevious} className="nav-button">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button onClick={handleNext} className="nav-button">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default ReelsView;
