import DealCard from './DealCard';
import './DealsGrid.css';

function DealsGrid({ deals, loading, t }) {
  if (loading) {
    return (
      <div className="skeleton-grid">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-line title"></div>
            <div className="skeleton-line subtitle"></div>
            <div className="skeleton-line text"></div>
            <div className="skeleton-line text"></div>
            <div className="skeleton-line"></div>
          </div>
        ))}
      </div>
    );
  }

  if (deals.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <h2 className="empty-title">{t('noDeals')}</h2>
        <p className="empty-message">{t('noDealsMessage')}</p>
      </div>
    );
  }

  return (
    <div className="deals-grid-container">
      <div className="deals-count">
        <span className="count-text">{deals.length} {t('dealsFound')}</span>
        <span className="count-number">🎉</span>
      </div>
      
      <div className="deals-grid">
        {deals.map(deal => (
          <DealCard key={deal.id} deal={deal} t={t} />
        ))}
      </div>
    </div>
  );
}

export default DealsGrid;