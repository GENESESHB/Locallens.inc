import React from 'react';
import './SearchResults.css';

function SearchResults({ results }) {
  return (
    <div className="search-results">
      {results.length > 0 ? (
        results.map(result => (
          <div key={result._id} className="search-result-item">
            <h3>{result.architectHomeName || result.cityName || result.clothingName || result.eatName || result.moroccanDecorationName || result.stateName}</h3>
            <div className="search-result-images">
              {result.stateImage && <img src={`http://localhost:5000/${result.stateImage}`} alt="State" />}
            </div>
            <p>post at {new Date(result.updatedAt).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default SearchResults;
