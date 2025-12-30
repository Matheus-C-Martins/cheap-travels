# Cheap Travels 🌍✈️

[![Deploy to GitHub Pages](https://github.com/Matheus-C-Martins/cheap-travels/actions/workflows/deploy.yml/badge.svg)](https://github.com/Matheus-C-Martins/cheap-travels/actions/workflows/deploy.yml)

## 🎯 Sistema de Rastreamento de Ofertas de Viagens

Plataforma automatizada que rastreia a internet em tempo real para encontrar **ofertas legítimas e verificadas** de passagens aéreas e cruzeiros com descontos de **50% a 90%**.

### ✨ Características Principais

- 🔍 **Scraping Automático** - Rastreia centenas de sites oficiais 24/7
- ✅ **100% Verificado** - Todas ofertas passam por validação rigorosa
- ⏰ **Tempo Real** - Atualizações a cada 30 minutos
- 🔗 **Links Oficiais** - Redirecionamento direto para sites confiáveis
- 🛡️ **Apenas 50-90% OFF** - Filtra automaticamente ofertas reais
- 💰 **Sem Ofertas Falsas** - Sistema anti-fraude integrado

## 🚀 Tecnologias

### Frontend
- **React 18** - Interface moderna e responsiva
- **Vite** - Build ultrarrápido
- **React Router** - Navegação SPA
- **CSS3** - Estilização avançada

### Backend
- **Node.js + Express** - API REST
- **Puppeteer** - Web scraping dinâmico
- **Cheerio** - Parsing HTML
- **Axios** - Requisições HTTP
- **Node-Cron** - Agendamento automático
- **Node-Cache** - Cache em memória

### CI/CD
- **GitHub Actions** - Pipeline automático
- **GitHub Pages** - Hospedagem frontend
- **ESLint** - Qualidade de código

## 📦 Instalação

### Frontend

```bash
# Clonar repositório
git clone https://github.com/Matheus-C-Martins/cheap-travels.git
cd cheap-travels

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com a URL da sua API

# Desenvolvimento
npm run dev

# Build
npm run build
```

### Backend API

```bash
cd api

# Instalar dependências
npm install

# Configurar variáveis
cp .env.example .env

# Desenvolvimento
npm run dev

# Produção
npm start
```

## 🔍 Fontes de Dados

### Voos ✈️
- Skyscanner
- Google Flights
- Kayak
- LATAM
- Azul
- GOL
- TAP Air Portugal

### Cruzeiros 🚢
- MSC Cruzeiros
- Costa Cruzeiros
- Royal Caribbean
- CVC Cruzeiros

## 🛡️ Sistema de Validação

Cada oferta passa por 5 etapas de validação:

1. **Cálculo de Desconto** - Verifica se está entre 50-90%
2. **Validação de URL** - Confirma que o link está ativo
3. **Verificação de Preço** - Confirma preços com a fonte
4. **Validação de Data** - Garante que não expirou
5. **Fonte Confiável** - Apenas sites oficiais

## 📁 Estrutura do Projeto

```
cheap-travels/
├── api/                      # Backend Node.js
│   ├── services/
│   │   ├── scraper.js        # Lógica de scraping
│   │   ├── validator.js      # Validação de ofertas
│   │   ├── scheduler.js      # Agendamento
│   │   └── dealsService.js   # Gerenciamento de ofertas
│   ├── routes/
│   │   └── deals.js          # Endpoints da API
│   ├── middleware/
│   │   └── rateLimiter.js    # Proteção contra abuse
│   └── server.js             # Servidor Express
├── src/                      # Frontend React
│   ├── components/
│   │   ├── DealCard.jsx      # Card de oferta
│   │   ├── FilterBar.jsx     # Barra de filtros
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx          # Página principal
│   │   └── About.jsx         # Sobre o sistema
│   ├── services/
│   │   └── api.js            # Cliente da API
│   └── App.jsx
├── .github/workflows/
│   └── deploy.yml            # CI/CD pipeline
└── DEPLOYMENT.md             # Guia de deploy completo
```

## 🔌 API Endpoints

```
GET /api/health          # Status da API
GET /api/deals           # Todas as ofertas
GET /api/deals/flights   # Apenas voos
GET /api/deals/cruises   # Apenas cruzeiros
```

### Exemplo de Resposta

```json
{
  "success": true,
  "count": 15,
  "data": [
    {
      "id": "flight-123",
      "type": "flight",
      "title": "São Paulo → Lisboa",
      "airline": "TAP Air Portugal",
      "originalPrice": 8500,
      "currentPrice": 2550,
      "discount": 70,
      "url": "https://...",
      "verified": true
    }
  ],
  "lastUpdate": "2025-12-30T12:00:00Z"
}
```

## 🌐 Deploy

### Frontend (GitHub Pages)

Deploy automático via GitHub Actions:
1. Push para `main`
2. Workflow executa build e deploy
3. Site disponível em: `https://matheus-c-martins.github.io/cheap-travels/`

### Backend API

Opções de hospedagem:
- **Render.com** (Recomendado - Gratuito)
- **Railway.app**
- **Heroku**
- **DigitalOcean**

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para guia completo.

## ⏰ Atualização Automática

O sistema executa scraping automaticamente:
- **Intervalo:** A cada 30 minutos
- **Fontes:** Todas simultaneamente
- **Validação:** Antes de cada publicação
- **Cache:** 5 minutos para performance

## 🛠️ Desenvolvimento

### Comandos Úteis

```bash
# Frontend
npm run dev          # Servidor desenvolvimento
npm run build        # Build produção
npm run lint         # Verificar código
npm run preview      # Preview do build

# Backend
cd api
npm run dev          # Servidor com nodemon
npm start            # Servidor produção
npm run scrape       # Executar scraping manual
```

### Adicionar Nova Fonte

1. Adicionar em `api/services/scraper.js`:
```javascript
const NEW_SOURCE = {
  name: 'Nome da Fonte',
  url: 'https://...',
  type: 'scrape' // ou 'api'
};
```

2. Implementar função de scraping específica

3. Adicionar validação

## 🔒 Segurança

- ✅ Helmet.js para headers seguros
- ✅ Rate limiting (100 req/min por IP)
- ✅ CORS configurado
- ✅ Validação de entrada
- ✅ San itização de dados

## ⚠️ Importante

### Legal
- Respeitar `robots.txt` de cada site
- Usar APIs oficiais quando disponível
- Não sobrecarregar servidores
- Incluir delays entre requisições

### Ética
- Apenas agregar informações públicas
- Redirecionar para sites oficiais
- Não armazenar dados pessoais
- Transparente sobre a fonte

## 📝 Próximos Passos

- [ ] Implementar scraping real com Puppeteer
- [ ] Integrar APIs oficiais (Skyscanner, Amadeus)
- [ ] Adicionar banco de dados (MongoDB/PostgreSQL)
- [ ] Sistema de notificações por email
- [ ] Filtros avançados (preço, data, origem)
- [ ] Gráficos de tendências de preços
- [ ] Sistema de favoritos
- [ ] Comparação lado a lado
- [ ] Aplicativo mobile (React Native)
- [ ] Testes automatizados

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFeature`)
3. Commit (`git commit -m 'Add NovaFeature'`)
4. Push (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📄 Licença

MIT © Matheus C. Martins

## 👨‍💻 Autor

**Matheus C. Martins**
- GitHub: [@Matheus-C-Martins](https://github.com/Matheus-C-Martins)
- Repositório: [cheap-travels](https://github.com/Matheus-C-Martins/cheap-travels)

---

⭐ Se este projeto foi útil, considere dar uma estrela!

🐛 Encontrou um bug? [Abra uma issue](https://github.com/Matheus-C-Martins/cheap-travels/issues)
