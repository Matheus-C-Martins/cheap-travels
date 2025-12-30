import PropTypes from 'prop-types';
import './FilterBar.css';

function FilterBar({ filter, setFilter, sortBy, setSortBy }) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="type-filter">Filtrar por tipo:</label>
        <select 
          id="type-filter"
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">Todos</option>
          <option value="flight">✈️ Voos</option>
          <option value="cruise">🚢 Cruzeiros</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="sort-select">Ordenar por:</label>
        <select 
          id="sort-select"
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="discount">Maior Desconto</option>
          <option value="price">Menor Preço</option>
          <option value="date">Data Mais Próxima</option>
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
};

export default FilterBar;