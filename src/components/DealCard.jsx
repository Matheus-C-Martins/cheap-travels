import './DealCard.css';

function DealCard({ deal, t }) {
  const isFlight = deal.type === 'flight';
  
  return (
    <div className="deal-card">
      {/* Badge de Desconto */}
      <div className="discount-badge">
        <span className="discount-value">{deal.discount}%</span>
        <span className="discount-label">{t('discount_label')}</span>
      </div>

      {/* Header */}
      <div className="card-header">
        <div className="deal-type">
          {isFlight ? '✈️' : '🚢'}
        </div>
        <div className="deal-source">{deal.source}</div>
      </div>

      {/* Título */}
      <h3 className="deal-title">{deal.title}</h3>

      {/* Detalhes */}
      <div className="deal-details">
        {isFlight ? (
          <>
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <span className="detail-text">{deal.origin} {t('to')} {deal.destination}</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📅</span>
              <span className="detail-text">{t('departure')}: {new Date(deal.departureDate).toLocaleDateString()}</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">✈️</span>
              <span className="detail-text">{deal.stops === 0 ? t('nonstop') : `${deal.stops} ${t('stops')}`}</span>
            </div>
          </>
        ) : (
          <>
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <span className="detail-text">{deal.destination}</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📅</span>
              <span className="detail-text">{t('departure')}: {new Date(deal.departureDate).toLocaleDateString()}</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">🌙</span>
              <span className="detail-text">{deal.duration} {t('nights')}</span>
            </div>
          </>
        )}
      </div>

      {/* Preço */}
      <div className="deal-pricing">
        <div className="price-old">
          {deal.currency === 'BRL' ? 'R$' : deal.currency} {deal.originalPrice.toLocaleString()}
        </div>
        <div className="price-current">
          {deal.currency === 'BRL' ? 'R$' : deal.currency} {deal.currentPrice.toLocaleString()}
        </div>
      </div>

      {/* Rodapé */}
      <div className="card-footer">
        <div className="verified-badge">
          <span className="verified-icon">✔️</span>
          <span className="verified-text">{t('verified')}</span>
        </div>
        <a 
          href={deal.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="deal-button"
        >
          {t('viewDeal')} →
        </a>
      </div>
    </div>
  );
}

export default DealCard;