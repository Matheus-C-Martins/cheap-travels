import './About.css'

function About() {
  return (
    <div className="about">
      <h1>Sobre o Cheap Travels</h1>
      
      <section className="about-section">
        <h2>Nossa Missão</h2>
        <p>
          Tornar as viagens acessíveis para todos. Acreditamos que todos merecem explorar 
          o mundo sem comprometer o orçamento. Nossa plataforma compara milhares de opções 
          para encontrar as melhores ofertas de viagens.
        </p>
      </section>

      <section className="about-section">
        <h2>Como Funciona</h2>
        <div className="steps">
          <div className="step">
            <span className="step-number">1</span>
            <h3>Busque</h3>
            <p>Digite seu destino desejado</p>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <h3>Compare</h3>
            <p>Veja as melhores ofertas em um só lugar</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <h3>Reserve</h3>
            <p>Escolha a melhor opção e reserve com segurança</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Tecnologia</h2>
        <p>
          Desenvolvido com as tecnologias mais modernas: React, Vite, e hospedado no GitHub Pages. 
          Nosso código é open source e está disponível para contribuições da comunidade.
        </p>
      </section>
    </div>
  )
}

export default About