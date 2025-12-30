import { useTranslation } from '../hooks/useTranslation';
import './DarkModeToggle.css';

function DarkModeToggle({ isDarkMode, onToggle }) {
  const { t } = useTranslation();

  return (
    <button
      className="dark-mode-toggle"
      onClick={onToggle}
      aria-label={isDarkMode ? t('lightMode') : t('darkMode')}
      title={isDarkMode ? t('lightMode') : t('darkMode')}
    >
      <span className="toggle-icon">{isDarkMode ? '☀️' : '🌙'}</span>
    </button>
  );
}

export default DarkModeToggle;