import './About.css';

function About() {
  return (
    <div className="about">
      <h1>🌍 Sobre o Cheap Travels</h1>
      
      <section className="about-section highlight">
        <h2>🎯 Nossa Missão</h2>
        <p>
          Democratizar o acesso a viagens de qualidade através de tecnologia. Rastreamos 
          automaticamente <strong>centenas de sites oficiais</strong> de companhias aéreas, 
          agências autorizadas e empresas de cruzeiros para encontrar ofertas 
          <strong> legítimas</strong> com descontos de <strong>50% a 90%</strong>.
        </p>
      </section>

      <section className="about-section">
        <h2>✅ O que nos torna diferentes</h2>
        <div className="features-list">
          <div className="feature-item">
            <span className="feature-icon">🔍</span>
            <div>
              <h3>Rastreamento Automático</h3>
              <p>Sistema automatizado que vasculha a internet 24/7 buscando as melhores ofertas</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🛡️</span>
            <div>
              <h3>100% Verificadas</h3>
              <p>Todas as ofertas passam por validação rigorosa antes de serem exibidas</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⏰</span>
            <div>
              <h3>Tempo Real</h3>
              <p>Atualizações automáticas a cada 30 minutos garantem ofertas frescas</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🔗</span>
            <div>
              <h3>Links Oficiais</h3>
              <p>Redirecionamos diretamente para os sites oficiais das empresas</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>🔍 Fontes Rastreadas</h2>
        <div className="sources-grid">
          <div className="source-category">
            <h3>✈️ Voos</h3>
            <ul>
              <li>Skyscanner</li>
              <li>Google Flights</li>
              <li>Kayak</li>
              <li>LATAM</li>
              <li>Azul</li>
              <li>GOL</li>
            </ul>
          </div>
          <div className="source-category">
            <h3>🚢 Cruzeiros</h3>
            <ul>
              <li>MSC Cruzeiros</li>
              <li>Costa Cruzeiros</li>
              <li>Royal Caribbean</li>
              <li>CVC Cruzeiros</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>🛡️ Processo de Validação</h2>
        <div className="validation-steps">
          <div className="step-card">
            <span className="step-number">1</span>
            <div>
              <h3>Coleta de Dados</h3>
              <p>Web scraping e APIs oficiais coletam ofertas em tempo real</p>
            </div>
          </div>
          <div className="step-card">
            <span className="step-number">2</span>
            <div>
              <h3>Cálculo de Desconto</h3>
              <p>Sistema verifica se o desconto real está entre 50-90%</p>
            </div>
          </div>
          <div className="step-card">
            <span className="step-number">3</span>
            <div>
              <h3>Validação de URL</h3>
              <p>Confirma que a oferta está ativa no site oficial</p>
            </div>
          </div>
          <div className="step-card">
            <span className="step-number">4</span>
            <div>
              <h3>Verificação de Data</h3>
              <p>Garante que a oferta não expirou</p>
            </div>
          </div>
          <div className="step-card">
            <span className="step-number">5</span>
            <div>
              <h3>Publicação</h3>
              <p>Apenas ofertas 100% verificadas são exibidas</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>💻 Tecnologia</h2>
        <p>
          Desenvolvido com as tecnologias mais modernas e rob ustas:
        </p>
        <div className="tech-stack">
          <div className="tech-item">
            <strong>Frontend:</strong> React 18, Vite, React Router
          </div>
          <div className="tech-item">
            <strong>Backend:</strong> Node.js, Express, Web Scraping
          </div>
          <div className="tech-item">
            <strong>Scraping:</strong> Puppeteer, Cheerio, Axios
          </div>
          <div className="tech-item">
            <strong>Deploy:</strong> GitHub Actions, GitHub Pages
          </div>
        </div>
      </section>

      <section className="about-section highlight">
        <h2>⚠️ Aviso Importante</h2>
        <p>
          Não somos uma agência de viagens. Somos um <strong>agregador de ofertas</strong> que 
          redireciona você para os sites oficiais. Todas as reservas são feitas diretamente 
          com as companhias aéreas, empresas de cruzeiro ou agências autorizadas.
        </p>
      </section>
    </div>
  );
}

export default About;