import PropTypes from 'prop-types';
import './FilterBar.css';

function FilterBar({ filter, setFilter, sortBy, setSortBy, showFavorites, setShowFavorites, favoritesCount, t }) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>{t('filterByType')}</label>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">{t('all')}</option>
          <option value="flight">{t('flight')}</option>
          <option value="cruise">{t('cruise')}</option>
        </select>
      </div>

      <div className="filter-group">
        <label>{t('sortBy')}</label>
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="discount">{t('discount')}</option>
          <option value="price">{t('price')}</option>
          <option value="date">{t('date')}</option>
        </select>
      </div>
      
      <button
        className={`favorites-toggle ${showFavorites ? 'active' : ''}`}
        onClick={() => setShowFavorites(!showFavorites)}
        title={showFavorites ? t('showAll') : t('showFavorites')}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={showFavorites ? 'currentColor' : 'none'}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>{showFavorites ? t('favorites') : t('favorites')}</span>
        {favoritesCount > 0 && (
          <span className="favorites-badge">{favoritesCount}</span>
        )}
      </button>
    </div>
  );
}

FilterBar.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
  showFavorites: PropTypes.bool.isRequired,
  setShowFavorites: PropTypes.func.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
};

export default FilterBar;