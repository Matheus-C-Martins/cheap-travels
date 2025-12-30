import { useState } from 'react'
import './Home.css'

function Home() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Buscando por:', searchTerm)
    // Implementar lógica de busca aqui
  }

  return (
    <div className="home">
      <section className="hero">
        <h1>Encontre Viagens Incríveis</h1>
        <p>Descubra os melhores destinos com preços acessíveis</p>
        
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Para onde você quer ir?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Buscar Viagens
          </button>
        </form>
      </section>

      <section className="features">
        <h2>Por que escolher a Cheap Travels?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">💰</span>
            <h3>Melhores Preços</h3>
            <p>Comparamos centenas de sites para encontrar as melhores ofertas</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔒</span>
            <h3>Seguro e Confiável</h3>
            <p>Suas informações estão protegidas com criptografia de ponta</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">⚡</span>
            <h3>Rápido e Fácil</h3>
            <p>Reserve sua viagem em poucos cliques</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home