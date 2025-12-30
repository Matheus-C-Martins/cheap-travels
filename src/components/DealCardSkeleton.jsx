import './DealCardSkeleton.css';

function DealCardSkeleton() {
  return (
    <div className="deal-card-skeleton">
      <div className="skeleton-badge"></div>
      
      <div className="skeleton-header">
        <div className="skeleton-icon"></div>
        <div className="skeleton-source"></div>
      </div>
      
      <div className="skeleton-title"></div>
      
      <div className="skeleton-details">
        <div className="skeleton-detail"></div>
        <div className="skeleton-detail"></div>
        <div className="skeleton-detail"></div>
      </div>
      
      <div className="skeleton-pricing">
        <div className="skeleton-price-old"></div>
        <div className="skeleton-price-current"></div>
      </div>
      
      <div className="skeleton-footer">
        <div className="skeleton-verified"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );
}

export default DealCardSkeleton;