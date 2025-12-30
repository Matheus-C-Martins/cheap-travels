import './FilterBar.css';

function FilterBar({ filter, setFilter, sortBy, setSortBy }) {
  return (
    <div className="filter-bar">
      <div className="filter-section">
        <label className="filter-label">🎯 Tipo:</label>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todas
          </button>
          <button
            className={`filter-btn ${filter === 'flights' ? 'active' : ''}`}
            onClick={() => setFilter('flights')}
          >
            ✈️ Voos
          </button>
          <button
            className={`filter-btn ${filter === 'cruises' ? 'active' : ''}`}
            onClick={() => setFilter('cruises')}
          >
            🚢 Cruzeiros
          </button>
        </div>
      </div>

      <div className="filter-section">
        <label className="filter-label">🔄 Ordenar por:</label>
        <select 
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="discount">Maior Desconto</option>
          <option value="price">Menor Preço</option>
          <option value="recent">Mais Recentes</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;