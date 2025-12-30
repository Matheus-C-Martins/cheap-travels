import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {currentYear} Cheap Travels. Todos os direitos reservados.</p>
        <p>Encontre as melhores ofertas de viagens 🌍</p>
      </div>
    </footer>
  )
}

export default Footer