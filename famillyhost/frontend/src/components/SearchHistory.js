import './SearchHistory.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

function SearchHistory({ searchHistory, onHistoryClick }) {
  return (
    <div className="search-history">
      {searchHistory.length > 0 && (
        <ul>
          {searchHistory.map((item, index) => (
               <li key={index} onClick={() => onHistoryClick(item)}>
               <FontAwesomeIcon icon={faClockRotateLeft} className='icohisto'/>
                  {item}
               </li>
          ))}
        </ul>
      )}
    </div>
  );
}

SearchHistory.propTypes = {
  searchHistory: PropTypes.array.isRequired,
  onHistoryClick: PropTypes.func.isRequired,
};

export default SearchHistory;
