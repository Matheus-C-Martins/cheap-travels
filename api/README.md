# Cheap Travels API 🚀

## Sistema de Rastreamento Automatizado de Ofertas

Backend completo para scraping em tempo real de ofertas verificadas de passagens aéreas e cruzeiros.

## ✨ Características

### Scraping Real Implementado
- ✅ **Puppeteer** - Scraping de sites dinâmicos
- ✅ **Cheerio** - Parsing HTML otimizado
- ✅ **Múltiplas Fontes** - LATAM, Azul, GOL, MSC, Costa, Royal Caribbean
- ✅ **Execução Paralela** - Até 2 scrapers simultâneos
- ✅ **Retry Automático** - Reexecuta em caso de falha
- ✅ **Rotação de User-Agents** - Evita bloqueios
- ✅ **Remoção de Duplicatas** - Ofertas únicas

### Validação Rigorosa
- ✅ Desconto real entre 50-90%
- ✅ URLs ativas verificadas
- ✅ Preços válidos
- ✅ Datas de expiração
- ✅ Fontes confiáveis

## 🔧 Instalação

```bash
cd api
npm install
cp .env.example .env
```

## 🚀 Uso

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

### Scraping Manual
```bash
npm run scrape
```

## 📡 Endpoints

### GET /api/health
Verifica status da API

**Resposta:**
```json
{
  "status": "ok",
  "message": "API funcionando"
}
```

### GET /api/deals
Retorna todas as ofertas

**Resposta:**
```json
{
  "success": true,
  "count": 25,
  "data": [...],
  "lastUpdate": "2025-12-30T12:00:00Z"
}
```

### GET /api/deals/flights
Retorna apenas voos

### GET /api/deals/cruises
Retorna apenas cruzeiros

## 🕷️ Scrapers Implementados

### Voos ✈️

#### LATAM Airlines
- **URL:** `https://www.latam.com/pt_br/ofertas/`
- **Método:** Puppeteer + Cheerio
- **Frequência:** A cada 30 minutos

#### Azul Linhas Aéreas
- **URL:** `https://www.voeazul.com.br/br/pt/home/ofertas`
- **Método:** Puppeteer + Cheerio

#### GOL Linhas Aéreas
- **URL:** `https://www.voegol.com.br/pt/ofertas`
- **Método:** Puppeteer + Cheerio

### Cruzeiros 🚢

#### MSC Cruzeiros
- **URL:** `https://www.msccruises.com.br/pt-br/Ofertas-Cruzeiros`
- **Método:** Puppeteer + Cheerio

#### Costa Cruzeiros
- **URL:** `https://www.costacruzeiros.com/ofertas.html`
- **Método:** Puppeteer + Cheerio

#### Royal Caribbean
- **URL:** `https://www.royalcaribbean.com/bra/pt/ofertas`
- **Método:** Puppeteer + Cheerio

## ⚙️ Configuração

### Variáveis de Ambiente (.env)

```env
PORT=3001
NODE_ENV=production
SCRAPE_INTERVAL_MINUTES=30
MAX_CONCURRENT_SCRAPES=2
CACHE_TTL_SECONDS=300
```

### Configurações de Scraping

Editar `api/config/scraping.js`:

```javascript
export const SCRAPING_CONFIG = {
  REQUEST_DELAY: 2000,       // Delay entre requests
  PAGE_TIMEOUT: 30000,       // Timeout de página
  MAX_CONCURRENT: 2,         // Scrapers simultâneos
  MAX_RETRIES: 2,            // Tentativas em caso de erro
  HEADLESS: true,            // Modo headless do Puppeteer
  USE_PROXIES: false         // Usar proxies (se configurado)
};
```

## 🛡️ Segurança e Boas Práticas

### Respeito aos Sites
- ✅ Delay entre requests (2 segundos)
- ✅ User-Agent realista
- ✅ Respeita robots.txt
- ✅ Máximo 2 scrapers simultâneos
- ✅ Retry com backoff exponencial

### Rate Limiting
- 100 requests por minuto por IP
- Configurado em `middleware/rateLimiter.js`

### Cache
- 5 minutos de TTL
- Reduz carga nos servidores

## 📊 Estrutura de Dados

### Oferta de Voo
```javascript
{
  id: 'latam-1735567890-0',
  type: 'flight',
  title: 'São Paulo → Lisboa',
  airline: 'LATAM Airlines',
  origin: 'São Paulo (GRU)',
  destination: 'Lisboa (LIS)',
  departureDate: '2026-03-15',
  returnDate: '2026-03-25',
  originalPrice: 8500,
  currentPrice: 2550,
  discount: 70,
  currency: 'BRL',
  url: 'https://www.latam.com/...',
  source: 'LATAM',
  verified: true,
  lastChecked: '2025-12-30T12:00:00Z',
  expiresAt: '2026-01-30T23:59:59Z',
  stops: 0,
  cabinClass: 'Econômica'
}
```

### Oferta de Cruzeiro
```javascript
{
  id: 'msc-1735567890-0',
  type: 'cruise',
  title: 'Cruzeiro Caribe 7 Noites',
  cruiseLine: 'MSC Cruzeiros',
  ship: 'MSC Seaside',
  ports: ['Miami', 'Cozumel', 'Jamaica'],
  departureDate: '2026-04-10',
  nights: 7,
  originalPrice: 12000,
  currentPrice: 3600,
  discount: 70,
  currency: 'BRL',
  url: 'https://www.msccruises.com/...',
  source: 'MSC Cruzeiros',
  verified: true,
  lastChecked: '2025-12-30T12:00:00Z',
  expiresAt: '2026-02-10T23:59:59Z',
  cabinType: 'Interior'
}
```

## 🔄 Fluxo de Scraping

1. **Inicialização** - Sistema inicia e agenda scraping
2. **Execução Paralela** - Até 2 scrapers por vez
3. **Extração** - Puppeteer navega e extrai dados
4. **Parsing** - Cheerio processa HTML
5. **Validação** - 5 etapas de verificação
6. **Filtragem** - Apenas 50-90% desconto
7. **Remoção de Duplicatas** - Por título
8. **Armazenamento** - Cache + memória
9. **Disponibilização** - Via API REST

## 🐛 Debug

### Logs Detalhados
```bash
# Ver logs em tempo real
npm run dev
```

### Screenshots em Erro
Ative em `config/scraping.js`:
```javascript
SCREENSHOT_ON_ERROR: true
```

### Testar Scraper Específico
```javascript
import { scrapeLATAM } from './services/scrapers/flightScrapers.js';
const deals = await scrapeLATAM();
console.log(deals);
```

## 📈 Performance

- **Tempo médio por fonte:** 10-15 segundos
- **Total scrapers:** 6 fontes
- **Tempo total:** ~45 segundos
- **Ofertas esperadas:** 10-50 por execução
- **Intervalo:** 30 minutos
- **Cache:** 5 minutos

## 🚨 Troubleshooting

### Puppeteer não inicia
```bash
# Instalar dependências do Chrome
sudo apt-get install -y chromium-browser
```

### Timeout nas páginas
- Aumentar `PAGE_TIMEOUT` em `config/scraping.js`
- Verificar conexão internet

### Nenhuma oferta encontrada
- Sites podem ter mudado estrutura HTML
- Atualizar seletores em `scrapers/*.js`
- Verificar se ofertas existem manualmente

### Bloqueio por anti-bot
- Aumentar `REQUEST_DELAY`
- Ativar rotação de user-agents
- Considerar usar proxies

## 📝 Adicionar Nova Fonte

1. Criar scraper em `services/scrapers/`
2. Implementar função de scraping
3. Adicionar validação
4. Registrar em `services/scraper.js`
5. Testar isoladamente
6. Deploy

## 📄 Licença

MIT © Matheus C. Martins
