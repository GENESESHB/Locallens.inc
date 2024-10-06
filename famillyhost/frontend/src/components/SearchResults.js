import React from 'react';
import './SearchResults.css';
import { Link } from 'react-router-dom';

function SearchResults({ results }) {
  return (
    <div className="search-results">
      {results.length > 0 ? (
        results.map(result => (
          <Link to={`/product/${result._id}`} key={result._id} className="search-result-item">
            <div className="search-result-content"> {/* Added a wrapper for consistent styling */}
              <div className="search-result-images">
                {result.stateImage && <img src={`http://localhost:5000/${result.stateImage}`} alt="State" />}
              </div>
              <h3>{result.architectHomeName || result.cityName || result.clothingName || result.eatName || result.moroccanDecorationName}</h3>
            </div>
          </Link>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default SearchResults;

