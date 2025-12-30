import { useState } from 'react';
import './DealCard.css';

function DealCard({ deal }) {
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: deal.currency || 'BRL'
    }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const getDiscountColor = (discount) => {
    if (discount >= 80) return '#10b981'; // Verde forte
    if (discount >= 70) return '#22c55e'; // Verde
    if (discount >= 60) return '#84cc16'; // Verde claro
    return '#eab308'; // Amarelo
  };

  const isFlight = deal.type === 'flight';

  return (
    <div className="deal-card">
      {/* Badge de Desconto */}
      <div 
        className="discount-badge"
        style={{ backgroundColor: getDiscountColor(deal.discount) }}
      >
        <span className="discount-value">-{deal.discount}%</span>
        <span className="discount-label">DESCONTO</span>
      </div>

      {/* Conteúdo Principal */}
      <div className="deal-content">
        <div className="deal-header">
          <h3 className="deal-title">{deal.title}</h3>
          <span className="deal-source">🏢 {deal.source}</span>
        </div>

        {/* Informações específicas */}
        {isFlight ? (
          <div className="deal-info flight-info">
            <div className="info-row">
              <span className="info-icon">✈️</span>
              <span className="info-text">{deal.airline}</span>
            </div>
            <div className="info-row">
              <span className="info-icon">📅</span>
              <span className="info-text">
                Ida: {formatDate(deal.departureDate)}
                {deal.returnDate && ` | Volta: ${formatDate(deal.returnDate)}`}
              </span>
            </div>
            <div className="info-row">
              <span className="info-icon">💺</span>
              <span className="info-text">
                {deal.stops === 0 ? 'Voo Direto' : `${deal.stops} parada(s)`}
              </span>
            </div>
          </div>
        ) : (
          <div className="deal-info cruise-info">
            <div className="info-row">
              <span className="info-icon">🚢</span>
              <span className="info-text">{deal.cruiseLine} - {deal.ship}</span>
            </div>
            <div className="info-row">
              <span className="info-icon">🌴</span>
              <span className="info-text">{deal.nights} noites</span>
            </div>
            <div className="info-row">
              <span className="info-icon">📅</span>
              <span className="info-text">Saída: {formatDate(deal.departureDate)}</span>
            </div>
            {deal.ports && deal.ports.length > 0 && (
              <div className="info-row">
                <span className="info-icon">⚓</span>
                <span className="info-text">Portos: {deal.ports.join(', ')}</span>
              </div>
            )}
          </div>
        )}

        {/* Preços */}
        <div className="deal-prices">
          <div className="price-original">
            <span className="price-label">De:</span>
            <span className="price-value strikethrough">{formatPrice(deal.originalPrice)}</span>
          </div>
          <div className="price-current">
            <span className="price-label">Por apenas:</span>
            <span className="price-value highlight">{formatPrice(deal.currentPrice)}</span>
          </div>
          <div className="price-savings">
            🎉 Economize {formatPrice(deal.originalPrice - deal.currentPrice)}!
          </div>
        </div>

        {/* Botão */}
        <a 
          href={deal.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="deal-button"
        >
          Ver Oferta Oficial 🔗
        </a>

        {/* Verificação */}
        <div className="deal-footer">
          <span className="verified-badge">
            ✅ Oferta Verificada
          </span>
          <span className="last-checked">
            Atualizada há {getTimeAgo(deal.lastChecked)}
          </span>
        </div>
      </div>
    </div>
  );
}

function getTimeAgo(date) {
  const minutes = Math.floor((new Date() - new Date(date)) / 60000);
  if (minutes < 1) return 'agora mesmo';
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

export default DealCard;