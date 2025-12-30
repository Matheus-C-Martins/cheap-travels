import PropTypes from 'prop-types';
import { useState } from 'react';
import './SearchBar.css';

function SearchBar({ searchTerm, setSearchTerm, t, resultsCount }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className={`search-bar ${isFocused ? 'focused' : ''}`}>
      <div className="search-input-wrapper">
        <svg 
          className="search-icon"
          width="20" 
          height="20" 
          viewBox="0 0 20 20" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        
        <input
          type="text"
          className="search-input"
          placeholder={t('searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Search destinations"
        />
        
        {searchTerm && (
          <button 
            className="search-clear"
            onClick={handleClear}
            aria-label="Clear search"
            type="button"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 4L4 12M4 4l8 8" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
      
      {searchTerm && (
        <div className="search-results-count">
          <span className="results-number">{resultsCount}</span>
          <span className="results-text">{t('resultsFound')}</span>
        </div>
      )}
    </div>
  );
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  resultsCount: PropTypes.number.isRequired,
};

export default SearchBar;