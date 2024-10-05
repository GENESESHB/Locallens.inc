import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is imported
import Footer from '../../components/Footer';
import { useAuth } from '../../contexts/AuthContext'; // Adjust the import path based on your project structure
import '../styles/Marketing.css'; // Ensure you have the correct path to your CSS file

const Marketing = () => {
  const [reelFile, setReelFile] = useState(null);
  const [reelType, setReelType] = useState('');
  const { user } = useAuth(); // Use the useAuth hook to get the current user

  const handleReelFileChange = (e) => {
    setReelFile(e.target.files[0]);
  };

  const handleReelTypeChange = (e) => {
    setReelType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('reelFile', reelFile);
    formData.append('reelType', reelType);
    formData.append('user', user._id); // Append the user ID here

    // Log the current user information to the console
    console.log('Current User:', user); // Log user info to verify it's correct

    // Include current user information in the submission
    const submissionData = {
      user, // Current user from AuthContext
      reelType,
    };

    // Log submission data to console
    console.log('Submission Data:', submissionData);

    try {
      // Handle form submission for uploading the reel file
      const response = await axios.post('http://localhost:5000/api/upload-reel', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Upload Response:', response.data);
    } catch (error) {
      console.error('Error uploading reel:', error);
    }
  };

  return (
    <div className="marketing-container">
      {/* Explanation Card */}
      <div className="card">
        <h2>Why Should You Upload Reels?</h2>
        <p>
          Uploading reels is essential for increasing your visibility to tourists. It allows them to find your services easily and see what you offer. By adding music to your reels and clearly explaining your activities, you can grab attention and get more visitors.
        </p>
        <p>
          Remember, a short reel (max 30 seconds) can highlight your services more effectively. Keep your content engaging and relevant!
        </p>
      </div>

      {/* Reel Requirements Card */}
      <div className="card">
        <h2>Reel Requirements</h2>
        <ul>
          <li>Format: MP4</li>
          <li>Maximum size: 100MB</li>
          <li>Recommended length: 30 seconds or less</li>
          <li>Make sure to add music and explain your activity clearly</li>
        </ul>
      </div>

      {/* Reel Upload Form */}
      <div className="marketing-page">
        <h1>Upload Your Reels</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reel-file">Upload Reel:</label>
            <input
              type="file"
              id="reel-file"
              onChange={handleReelFileChange}
              accept="video/mp4,video/x-m4v,video/"
            />
            <small>Accepted formats: MP4, Maximum size: 100MB</small>
          </div>

          <div className="form-group">
            <label htmlFor="reel-type">Choose Reel Type:</label>
            <select id="reel-type" value={reelType} onChange={handleReelTypeChange}>
              <option value="">Select type</option>
              <option value="Sahara">Sahara</option>
              <option value="tamazight">Tamazight</option>
              <option value="Celebration">Celebration</option>
              <option value="Atlas">Atlas Activities</option>
              <option value="Beach">Beach and Swimming</option>
              <option value="Traditional">Traditional Clothing</option>
            </select>
          </div>

          <div className="form-navigation">
            <button type="submit">Submit Reel</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Marketing;
