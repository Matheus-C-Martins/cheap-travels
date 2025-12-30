import { useState, useEffect } from 'react';
import FilterBar from './components/FilterBar';
import DealsGrid from './components/DealsGrid';
import LanguageSwitcher from './components/LanguageSwitcher';
import SearchBar from './components/SearchBar';
import ScrollToTop from './components/ScrollToTop';
import SkipLink from './components/SkipLink';
import DarkModeToggle from './components/DarkModeToggle';
import LoadingState from './components/LoadingState';
import { useTranslation } from './hooks/useTranslation';
import { useFavorites } from './hooks/useFavorites';
import { useDarkMode } from './hooks/useDarkMode';
import './App.css';
import './styles/accessibility.css';

function App() {
  const { t, language, changeLanguage } = useTranslation();
  const { toggleFavorite, isFavorite, favoritesCount } = useFavorites();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('discount');
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({ flights: 0, cruises: 0 });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

  // Fetch deals only once on mount and set up interval
  useEffect(() => {
    let isMounted = true;
    
    const fetchDeals = async () => {
      if (!isMounted) return;
      
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/deals`, {
          signal: AbortSignal.timeout(15000)
        });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        
        if (isMounted && data.success && Array.isArray(data.data)) {
          setDeals(data.data);
        } else if (isMounted) {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        if (!isMounted) return;
        
        console.error('Error fetching deals:', err);
        
        if (err.name === 'TimeoutError') {
          setError('Request timeout. Server might be busy.');
        } else if (err.message.includes('Failed to fetch')) {
          setError('Connection error. Check your internet.');
        } else {
          setError(err.message);
        }
        
        setDeals([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Initial fetch
    fetchDeals();
    
    // Set up interval for periodic refresh (5 minutes)
    const interval = setInterval(fetchDeals, 5 * 60 * 1000);
    
    // Cleanup
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [API_URL]); // Only depend on API_URL

  // Filter and sort deals
  useEffect(() => {
    let result = [...deals];

    // Favorites filter
    if (showFavorites) {
      result = result.filter(deal => isFavorite(deal.id));
    }

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(deal => {
        const title = deal.title?.toLowerCase() || '';
        const destination = deal.destination?.toLowerCase() || '';
        const origin = deal.origin?.toLowerCase() || '';
        
        return title.includes(search) || 
               destination.includes(search) || 
               origin.includes(search);
      });
    }

    // Type filter
    if (filter !== 'all') {
      result = result.filter(deal => deal.type === filter);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'discount':
          return b.discount - a.discount;
        case 'price':
          return a.currentPrice - b.currentPrice;
        case 'date':
          return new Date(a.departureDate) - new Date(b.departureDate);
        default:
          return 0;
      }
    });

    setFilteredDeals(result);
  }, [deals, filter, sortBy, showFavorites, isFavorite, searchTerm]);

  // Calculate stats
  useEffect(() => {
    const flights = deals.filter(d => d.type === 'flight').length;
    const cruises = deals.filter(d => d.type === 'cruise').length;
    setStats({ flights, cruises });
  }, [deals]);

  function handleRetry() {
    window.location.reload();
  }

  return (
    <div className="app">
      <SkipLink />
      
      <header className="app-header" role="banner">
        <div className="header-content">
          <a href="/" className="logo" aria-label={`${t('appName')} - ${t('tagline')}`}>
            <span className="logo-icon" aria-hidden="true">✈️</span>
            <div className="logo-text">
              <h1>{t('appName')}</h1>
              <p className="logo-tagline">{t('tagline')}</p>
            </div>
          </a>
          
          <div className="header-right">
            <div className="header-stats" role="status" aria-live="polite">
              <div className="stat-item">
                <span className="stat-value">{stats.flights}</span>
                <span className="stat-label">{t('flights')}</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.cruises}</span>
                <span className="stat-label">{t('cruises')}</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{deals.length}</span>
                <span className="stat-label">{t('total')}</span>
              </div>
            </div>
            
            <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
            
            <LanguageSwitcher 
              currentLanguage={language} 
              onLanguageChange={changeLanguage}
            />
          </div>
        </div>
      </header>

      <main className="app-main" id="main-content" role="main">
        {error ? (
          <div className="error-container" role="alert" aria-live="assertive">
            <div className="error-icon" aria-hidden="true">⚠️</div>
            <h2 className="error-title">{t('errorTitle')}</h2>
            <p className="error-message">{error}</p>
            <button 
              onClick={handleRetry} 
              className="retry-button"
              aria-label={t('retryButton')}
            >
              <span aria-hidden="true">⟳</span> {t('retryButton')}
            </button>
            <p className="error-hint">
              <span aria-hidden="true">💡</span> {t('errorHint')}
            </p>
          </div>
        ) : loading ? (
          <LoadingState t={t} />
        ) : (
          <>
            <SearchBar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              t={t}
              resultsCount={filteredDeals.length}
            />
            
            <FilterBar
              filter={filter}
              setFilter={setFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              showFavorites={showFavorites}
              setShowFavorites={setShowFavorites}
              favoritesCount={favoritesCount}
              t={t}
            />
            
            <DealsGrid 
              deals={filteredDeals} 
              loading={false} 
              t={t}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          </>
        )}
      </main>

      <footer className="app-footer" role="contentinfo">
        <div className="footer-content">
          <p className="footer-text">{t('footerText')}</p>
          <nav className="footer-links" aria-label="Footer navigation">
            <a 
              href="https://github.com/Matheus-C-Martins/cheap-travels" 
              className="footer-link" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={`${t('github')} (opens in new tab)`}
            >
              {t('github')}
            </a>
            <a href="#" className="footer-link">{t('about')}</a>
            <a href="#" className="footer-link">{t('contact')}</a>
          </nav>
        </div>
      </footer>
      
      <ScrollToTop />
    </div>
  );
}

export default App;