import PropTypes from 'prop-types';
import './FavoriteButton.css';

function FavoriteButton({ dealId, isFavorite, onToggle }) {
  return (
    <button
      className={`favorite-button ${isFavorite ? 'active' : ''}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle(dealId);
      }}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        className="heart-icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={isFavorite ? 'currentColor' : 'none'}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

FavoriteButton.propTypes = {
  dealId: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default FavoriteButton;