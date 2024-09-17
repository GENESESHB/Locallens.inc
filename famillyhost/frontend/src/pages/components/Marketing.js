import React, { useState } from 'react';
import '../styles/Marketing.css'; // Ensure you have the correct path to your CSS file

const Marketing = () => {
  const [step, setStep] = useState(1);
  const [videoUrl, setVideoUrl] = useState('');
  const [reelUrl, setReelUrl] = useState('');
  const [galleryImages, setGalleryImages] = useState([]);
  const [location, setLocation] = useState('');

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleVideoChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleReelChange = (e) => {
    setReelUrl(e.target.value);
  };

  const handleGalleryChange = (e) => {
    setGalleryImages([...e.target.files]);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission to upload content to the backend
  };

  return (
  <div className='vinvo'>
   <div className='supma'>
    <div className="marketing-page">
      <h1>Marketing Your Products</h1>

      {step === 1 && (
        <div className="step-one">
          <h2>Why Choose Our Marketing Services?</h2>
          <p>Boost your visibility by adding videos, reels, and a gallery of images showcasing your services. Choose the location that best represents your experiences, whether it's the Atlas Mountains, the Sahara Desert, or the coast.</p>
          <ul>
            <li>Upload engaging videos to attract clients.</li>
            <li>Showcase your experiences with reels.</li>
            <li>Create a beautiful gallery of images from your tours.</li>
            <li>Specify the location to help clients know what to expect.</li>
          </ul>
          <button className="next-button" onClick={handleNextStep}>
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="step-two">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="video-url">Video URL:</label>
              <input
                type="text"
                id="video-url"
                value={videoUrl}
                onChange={handleVideoChange}
                placeholder="Enter video URL"
              />
            </div>

            <div className="form-group">
              <label htmlFor="reel-url">Reel URL:</label>
              <input
                type="text"
                id="reel-url"
                value={reelUrl}
                onChange={handleReelChange}
                placeholder="Enter reel URL"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gallery-images">Gallery Images:</label>
              <input
                type="file"
                id="gallery-images"
                multiple
                onChange={handleGalleryChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Select Location:</label>
              <select id="location" value={location} onChange={handleLocationChange}>
                <option value="">Select a location</option>
                <option value="Atlas">Atlas Mountains</option>
                <option value="Sahara">Sahara Desert</option>
                <option value="Coast">Coast</option>
              </select>
            </div>

            <div className="form-navigation">
              <button type="button" onClick={handlePreviousStep}>
                Previous
              </button>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      )}
    </div>
   </div>
  </div>
  );
};

export default Marketing;
