import PropTypes from 'prop-types';
import './FilterBar.css';

function FilterBar({ filter, setFilter, sortBy, setSortBy, t }) {
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
    </div>
  );
}

FilterBar.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default FilterBar;