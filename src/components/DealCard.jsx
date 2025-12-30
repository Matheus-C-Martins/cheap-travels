import PropTypes from 'prop-types';
import './DealCard.css';

function DealCard({ deal }) {
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: deal.currency || 'BRL'
    }).format(price);
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Data não informada';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };
  
  const getDiscountClass = (discount) => {
    if (discount >= 80) return 'discount-badge extreme';
    if (discount >= 70) return 'discount-badge high';
    if (discount >= 60) return 'discount-badge medium';
    return 'discount-badge low';
  };
  
  const savings = deal.originalPrice - deal.currentPrice;
  
  return (
    <div className="deal-card">
      <div className="deal-header">
        <div className={getDiscountClass(deal.discount)}>
          {deal.discount}% OFF
        </div>
        <div className="deal-type">
          {deal.type === 'flight' ? '✈️ Voo' : '🚢 Cruzeiro'}
        </div>
      </div>
      
      <div className="deal-content">
        <h3 className="deal-title">{deal.title}</h3>
        
        <div className="deal-details">
          {deal.type === 'flight' && (
            <>
              <p className="detail-item">
                <span className="detail-label">🛫 Companhia:</span>
                <span className="detail-value">{deal.airline}</span>
              </p>
              <p className="detail-item">
                <span className="detail-label">📍 Origem:</span>
                <span className="detail-value">{deal.origin}</span>
              </p>
              <p className="detail-item">
                <span className="detail-label">📍 Destino:</span>
                <span className="detail-value">{deal.destination}</span>
              </p>
              <p className="detail-item">
                <span className="detail-label">📅 Partida:</span>
                <span className="detail-value">{formatDate(deal.departureDate)}</span>
              </p>
            </>
          )}
          
          {deal.type === 'cruise' && (
            <>
              <p className="detail-item">
                <span className="detail-label">🚢 Companhia:</span>
                <span className="detail-value">{deal.cruiseLine}</span>
              </p>
              <p className="detail-item">
                <span className="detail-label">⛴️ Navio:</span>
                <span className="detail-value">{deal.ship}</span>
              </p>
              <p className="detail-item">
                <span className="detail-label">🌊 Portos:</span>
                <span className="detail-value">{deal.ports?.join(', ')}</span>
              </p>
              <p className="detail-item">
                <span className="detail-label">🌙 Noites:</span>
                <span className="detail-value">{deal.nights}</span>
              </p>
            </>
          )}
        </div>
        
        <div className="deal-pricing">
          <div className="original-price">
            De: <span className="price-value strikethrough">{formatPrice(deal.originalPrice)}</span>
          </div>
          <div className="current-price">
            Por: <span className="price-value highlight">{formatPrice(deal.currentPrice)}</span>
          </div>
          <div className="savings">
            💰 Economia de {formatPrice(savings)}
          </div>
        </div>
      </div>
      
      <div className="deal-footer">
        <a 
          href={deal.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="deal-button"
        >
          Ver Oferta 🔗
        </a>
        <div className="deal-meta">
          <span className="source">Fonte: {deal.source}</span>
          <span className="verified">✓ Verificado</span>
        </div>
      </div>
    </div>
  );
}

DealCard.propTypes = {
  deal: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['flight', 'cruise']).isRequired,
    title: PropTypes.string.isRequired,
    originalPrice: PropTypes.number.isRequired,
    currentPrice: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    currency: PropTypes.string,
    url: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    verified: PropTypes.bool,
    // Flight specific
    airline: PropTypes.string,
    origin: PropTypes.string,
    destination: PropTypes.string,
    departureDate: PropTypes.string,
    // Cruise specific
    cruiseLine: PropTypes.string,
    ship: PropTypes.string,
    ports: PropTypes.arrayOf(PropTypes.string),
    nights: PropTypes.number,
  }).isRequired,
};

export default DealCard;