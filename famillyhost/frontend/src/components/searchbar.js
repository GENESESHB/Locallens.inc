import React, { useState, useEffect, useRef, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';
import SearchResults from './SearchResults';
import SearchHistory from './SearchHistory';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [results, setResults] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSearchHistory, setShowSearchHistory] = useState(true); // New state to toggle display
  const inputRef = useRef(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Load search history from localStorage or API
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(history);
  }, []);

  const handleInputClick = () => {
    setIsExpanded(true); // Expand the dropdown
    setShowSearchHistory(true); // Show search history
  };

  const handleClick = async () => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      // Perform search when search icon is clicked
      console.log('Search keyword:', keyword);

      if (user && user._id) {
        console.log('User ID:', user._id);
        await searchService(keyword, user._id);
      } else {
        try {
          const ipResponse = await axios.get('https://api.ipify.org?format=json');
          const ipAddress = ipResponse.data.ip;
          console.log('User IP Address:', ipAddress);
          await searchService(keyword, null, ipAddress);
        } catch (error) {
          console.error('Error fetching IP address:', error);
        }
      }

      // Save the keyword to search history
      if (keyword && !searchHistory.includes(keyword)) {
        const newHistory = [keyword, ...searchHistory];
        setSearchHistory(newHistory);
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      }

      // Show search results after performing search
      setShowSearchHistory(false); // Hide search history, show results
    }
  };

  const searchService = async (keyword, userId = null, ipAddress = null) => {
    try {
      const headers = {};
      if (user && user.token) {
        headers['Authorization'] = `Bearer ${user.token}`;
      }

      const response = await axios.get(`http://localhost:5000/api/search`, {
        headers,
        params: { keyword, userId, ipAddress },
      });
      setResults(response.data);
      console.log(response.data); // Handle search results
    } catch (error) {
      console.error('Error searching services:', error);
    }
  };

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsExpanded(false);
    }
  };

  const handleHistoryClick = (item) => {
    setKeyword(item);
    setIsExpanded(true);
    setShowSearchHistory(false); // Switch to showing search results
    searchService(item, user?._id, null);
  };

  return (
    <div
      className={`search-bar ${isExpanded ? 'expanded' : ''}`}
      onBlur={handleBlur}
      tabIndex={-1}
    >
      <input
        className='search-inp'
        type="text"
        placeholder="Search..."
        onClick={handleInputClick} // Show history when clicked
        onChange={handleInputChange}
        ref={inputRef}
        value={keyword}
      />
      <button className="search-icon" onClick={handleClick}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
      {isExpanded && (
        <div className="search-dropdown">
          {showSearchHistory ? (
            <SearchHistory searchHistory={searchHistory} onHistoryClick={handleHistoryClick} />
          ) : (
            <SearchResults results={results} />
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
