import { useState, useEffect } from 'react';
import { fetchAllDeals } from '../services/api';
import DealCard from '../components/DealCard';
import FilterBar from '../components/FilterBar';
import './Home.css';

function Home() {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('discount');
  const [lastUpdate, setLastUpdate] = useState(null);

  // Buscar ofertas
  const loadDeals = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchAllDeals();
      setDeals(response.data || []);
      setLastUpdate(response.lastUpdate);
    } catch (err) {
      setError('Erro ao carregar ofertas. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Carregar ao montar
  useEffect(() => {
    loadDeals();
    
    // Atualizar a cada 5 minutos
    const interval = setInterval(loadDeals, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Filtrar e ordenar
  useEffect(() => {
    let filtered = [...deals];

    // Aplicar filtro de tipo
    if (filter === 'flights') {
      filtered = filtered.filter(d => d.type === 'flight');
    } else if (filter === 'cruises') {
      filtered = filtered.filter(d => d.type === 'cruise');
    }

    // Aplicar ordenação
    if (sortBy === 'discount') {
      filtered.sort((a, b) => b.discount - a.discount);
    } else if (sortBy === 'price') {
      filtered.sort((a, b) => a.currentPrice - b.currentPrice);
    } else if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.lastChecked) - new Date(a.lastChecked));
    }

    setFilteredDeals(filtered);
  }, [deals, filter, sortBy]);

  if (loading && deals.length === 0) {
    return (
      <div className="home">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">🔍 Buscando as melhores ofertas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-deals">
        <h1>🎉 Ofertas Incríveis de Viagens</h1>
        <p className="hero-subtitle">
          Descontos de <strong>50% a 90%</strong> em passagens aéreas e cruzeiros
        </p>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">{filteredDeals.length}</span>
            <span className="stat-label">Ofertas Ativas</span>
          </div>
          <div className="stat">
            <span className="stat-value">✅</span>
            <span className="stat-label">100% Verificadas</span>
          </div>
          <div className="stat">
            <span className="stat-value">🔄</span>
            <span className="stat-label">Tempo Real</span>
          </div>
        </div>
        {lastUpdate && (
          <p className="last-update">
            ⏰ Última atualização: {new Date(lastUpdate).toLocaleString('pt-BR')}
          </p>
        )}
      </section>

      {/* Filtros */}
      <FilterBar 
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Mensagem de erro */}
      {error && (
        <div className="error-message">
          <span>⚠️ {error}</span>
          <button onClick={loadDeals} className="retry-btn">Tentar Novamente</button>
        </div>
      )}

      {/* Grid de Ofertas */}
      {filteredDeals.length > 0 ? (
        <div className="deals-grid">
          {filteredDeals.map(deal => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      ) : (
        <div className="no-deals">
          <p>🔍 Nenhuma oferta encontrada no momento.</p>
          <p>Novas ofertas são adicionadas automaticamente a cada 30 minutos.</p>
          <button onClick={loadDeals} className="refresh-btn">
            🔄 Atualizar Agora
          </button>
        </div>
      )}

      {/* Botão de Atualização Manual */}
      <div className="refresh-container">
        <button 
          onClick={loadDeals} 
          className="refresh-btn"
          disabled={loading}
        >
          {loading ? '🔄 Atualizando...' : '🔄 Atualizar Ofertas'}
        </button>
      </div>
    </div>
  );
}

export default Home;