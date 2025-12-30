import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DealCard from './DealCard';
import './DealsGrid.css';

function DealsGrid({ deals, loading }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (loading) {
    return (
      <div className="deals-grid-container">
        <div className="skeleton-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-line title skeleton-shimmer" />
              <div className="skeleton-line subtitle skeleton-shimmer" />
              <div className="skeleton-line text skeleton-shimmer" />
              <div className="skeleton-line text skeleton-shimmer" />
              <div className="skeleton-line skeleton-shimmer" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!deals || deals.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <h2 className="empty-title">Nenhuma oferta encontrada</h2>
        <p className="empty-message">
          Não há ofertas que correspondam aos seus filtros no momento.
          Tente ajustar os filtros ou volte mais tarde.
        </p>
      </div>
    );
  }

  return (
    <div className="deals-grid-container">
      <div className="deals-count">
        <span className="count-text">Ofertas disponíveis</span>
        <span className="count-number">{deals.length}</span>
      </div>
      
      <div className={`deals-grid ${mounted ? 'mounted' : ''}`}>
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  );
}

DealsGrid.propTypes = {
  deals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['flight', 'cruise']).isRequired,
      title: PropTypes.string.isRequired,
      originalPrice: PropTypes.number.isRequired,
      currentPrice: PropTypes.number.isRequired,
      discount: PropTypes.number.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool,
};

DealsGrid.defaultProps = {
  loading: false,
};

export default DealsGrid;