import { useState, useEffect, useCallback } from 'react';
import FilterBar from './components/FilterBar';
import DealsGrid from './components/DealsGrid';
import LanguageSwitcher from './components/LanguageSwitcher';
import SearchBar from './components/SearchBar';
import ScrollToTop from './components/ScrollToTop';
import { useTranslation } from './hooks/useTranslation';
import { useFavorites } from './hooks/useFavorites';
import './App.css';

function App() {
  const { t, language, changeLanguage } = useTranslation();
  const { favorites, toggleFavorite, isFavorite, favoritesCount } = useFavorites();
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('discount');
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({ flights: 0, cruises: 0 });
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

  const fetchDeals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setLoadingTimeout(false);

      const timeoutId = setTimeout(() => {
        setLoadingTimeout(true);
      }, 10000);

      const response = await fetch(`${API_URL}/deals`, {
        signal: AbortSignal.timeout(15000)
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`${t('errorTitle')}: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && Array.isArray(data.data)) {
        setDeals(data.data);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (err) {
      console.error('Error fetching deals:', err);
      
      if (err.name === 'TimeoutError') {
        setError(t('errorTimeoutMessage'));
      } else if (err.message.includes('Failed to fetch')) {
        setError(t('errorConnectionMessage'));
      } else {
        setError(err.message);
      }
      
      setDeals([]);
    } finally {
      setLoading(false);
      setLoadingTimeout(false);
    }
  }, [API_URL, t]);

  useEffect(() => {
    fetchDeals();
    const interval = setInterval(fetchDeals, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchDeals]);

  useEffect(() => {
    let result = [...deals];

    // Favorites filter
    if (showFavorites) {
      result = result.filter(deal => isFavorite(deal.id));
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
          return new Date(a.departureDate || a.departureDate) - new Date(b.departureDate || b.departureDate);
        default:
          return 0;
      }
    });

    setFilteredDeals(result);
  }, [deals, filter, sortBy, showFavorites, favorites, isFavorite]);

  useEffect(() => {
    const flights = deals.filter(d => d.type === 'flight').length;
    const cruises = deals.filter(d => d.type === 'cruise').length;
    setStats({ flights, cruises });
  }, [deals]);

  function handleRetry() {
    fetchDeals();
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <a href="/" className="logo">
            <span className="logo-icon">✈️</span>
            <div className="logo-text">
              <h1>{t('appName')}</h1>
              <p className="logo-tagline">{t('tagline')}</p>
            </div>
          </a>
          
          <div className="header-right">
            <div className="header-stats">
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
            
            <LanguageSwitcher 
              currentLanguage={language} 
              onLanguageChange={changeLanguage}
            />
          </div>
        </div>
      </header>

      <main className="app-main">
        {error ? (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h2 className="error-title">{t('errorTitle')}</h2>
            <p className="error-message">{error}</p>
            <button onClick={handleRetry} className="retry-button">
              ⟳ {t('retryButton')}
            </button>
            <p className="error-hint">
              💡 <strong>{t('errorHint').split(':')[0]}:</strong> {t('errorHint').split(':')[1]}
            </p>
          </div>
        ) : (
          <>
            {!loading && (
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
                  t={t}
                />
              </>
            )}
            
            {loading && loadingTimeout && (
              <div className="loading-timeout-message">
                <div className="timeout-icon">⏳</div>
                <h3 className="timeout-title">{t('loadingTimeout')}</h3>
                <p className="timeout-text">{t('loadingTimeoutText')}</p>
                <div className="timeout-dots">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
            
            <DealsGrid 
              deals={filteredDeals} 
              loading={loading} 
              t={t}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          </>
        )}
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p className="footer-text">{t('footerText')}</p>
          <div className="footer-links">
            <a href="https://github.com/Matheus-C-Martins/cheap-travels" className="footer-link" target="_blank" rel="noopener noreferrer">
              {t('github')}
            </a>
            <a href="#" className="footer-link">{t('about')}</a>
            <a href="#" className="footer-link">{t('contact')}</a>
          </div>
        </div>
      </footer>
      
      <ScrollToTop />
    </div>
  );
}

export default App;