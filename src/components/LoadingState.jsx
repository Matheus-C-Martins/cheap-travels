import PropTypes from 'prop-types';
import DealCardSkeleton from './DealCardSkeleton';
import './LoadingState.css';

function LoadingState({ t }) {
  return (
    <div className="loading-state">
      <div className="loading-header">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-plane">✈️</div>
        </div>
        <h2 className="loading-title">{t('loading')}</h2>
        <p className="loading-subtitle">{t('loadingSubtitle')}</p>
      </div>
      
      <div className="skeleton-grid">
        <DealCardSkeleton />
        <DealCardSkeleton />
        <DealCardSkeleton />
        <DealCardSkeleton />
        <DealCardSkeleton />
        <DealCardSkeleton />
      </div>
    </div>
  );
}

LoadingState.propTypes = {
  t: PropTypes.func.isRequired,
};

export default LoadingState;