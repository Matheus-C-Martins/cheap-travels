import { useState, useEffect, useCallback } from 'react';
import FilterBar from './components/FilterBar';
import DealsGrid from './components/DealsGrid';
import './App.css';

function App() {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('discount');
  const [stats, setStats] = useState({ flights: 0, cruises: 0 });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

  // Memoize fetchDeals para resolver warning do ESLint
  const fetchDeals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/deals`);
      
      if (!response.ok) {
        throw new Error(`Erro ao carregar ofertas: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && Array.isArray(data.data)) {
        setDeals(data.data);
      } else {
        throw new Error('Formato de dados inválido');
      }
    } catch (err) {
      console.error('Erro ao buscar ofertas:', err);
      setError(err.message);
      // Dados mockados para desenvolvimento
      setDeals([]);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  // Fetch deals
  useEffect(() => {
    fetchDeals();
    // Atualizar a cada 5 minutos
    const interval = setInterval(fetchDeals, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchDeals]);

  // Filter and sort deals
  useEffect(() => {
    let result = [...deals];

    // Filtrar por tipo
    if (filter !== 'all') {
      result = result.filter(deal => deal.type === filter);
    }

    // Ordenar
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
  }, [deals, filter, sortBy]);

  // Calculate stats
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
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <a href="/" className="logo">
            <span className="logo-icon">✈️</span>
            <div className="logo-text">
              <h1>Cheap Travels</h1>
              <p className="logo-tagline">Ofertas verificadas até 90% OFF</p>
            </div>
          </a>
          
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-value">{stats.flights}</span>
              <span className="stat-label">Voos</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.cruises}</span>
              <span className="stat-label">Cruzeiros</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{deals.length}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {error ? (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h2 className="error-title">Erro ao Carregar Ofertas</h2>
            <p className="error-message">{error}</p>
            <button onClick={handleRetry} className="retry-button">
              Tentar Novamente
            </button>
          </div>
        ) : (
          <>
            <FilterBar
              filter={filter}
              setFilter={setFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
            
            <DealsGrid deals={filteredDeals} loading={loading} />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p className="footer-text">
            © 2025 Cheap Travels. Ofertas atualizadas automaticamente.
          </p>
          <div className="footer-links">
            <a href="https://github.com/Matheus-C-Martins/cheap-travels" className="footer-link" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="#" className="footer-link">Sobre</a>
            <a href="#" className="footer-link">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;