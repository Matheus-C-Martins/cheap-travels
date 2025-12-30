# 🚀 Guia de Deploy - Cheap Travels

## 🎯 Visão Geral

O Cheap Travels é composto por duas partes:
1. **Frontend** (React + Vite) - Hospedado no GitHub Pages
2. **Backend API** (Node.js + Express) - Precisa ser hospedado separadamente

## 📦 Parte 1: Deploy do Frontend (GitHub Pages)

### Automático via GitHub Actions

O frontend está configurado para deploy automático:

1. **Configurar GitHub Pages:**
   - Vá em: Settings > Pages
   - Source: selecione "GitHub Actions"
   - O deploy ocorrerá automaticamente a cada push na branch `main`

2. **Verificar Deploy:**
   - Acesse: `https://matheus-c-martins.github.io/cheap-travels/`
   - Ou clique na aba "Actions" para ver o progresso

### Deploy Manual (Alternativo)

```bash
npm run build
npm run deploy
```

## 🔧 Parte 2: Deploy da API (Backend)

### Opção 1: Render.com (Recomendado - Gratuito)

1. **Criar conta:** https://render.com

2. **Criar Web Service:**
   - Clique em "New +" > "Web Service"
   - Conecte seu repositório GitHub
   - Configure:
     ```
     Name: cheap-travels-api
     Root Directory: api
     Build Command: npm install
     Start Command: npm start
     ```

3. **Variáveis de Ambiente:**
   ```
   PORT=3001
   NODE_ENV=production
   ```

4. **Deploy:**
   - Clique em "Create Web Service"
   - Anote a URL gerada (ex: `https://cheap-travels-api.onrender.com`)

### Opção 2: Railway.app

1. **Criar conta:** https://railway.app

2. **Novo Projeto:**
   - "New Project" > "Deploy from GitHub repo"
   - Selecione o repositório

3. **Configurar:**
   ```
   Root Directory: api
   Start Command: npm start
   ```

### Opção 3: Heroku

1. **Instalar Heroku CLI:**
   ```bash
   npm install -g heroku
   ```

2. **Deploy:**
   ```bash
   cd api
   heroku create cheap-travels-api
   git subtree push --prefix api heroku main
   ```

### Opção 4: DigitalOcean App Platform

1. Criar conta no DigitalOcean
2. "Apps" > "Create App"
3. Conectar GitHub e configurar

## 🔗 Parte 3: Conectar Frontend com Backend

### 1. Configurar URL da API

Crie `.env` na raiz do projeto:

```env
VITE_API_URL=https://sua-api.onrender.com/api
```

### 2. Rebuild do Frontend

```bash
npm run build
```

### 3. Verificar Conexão

Abra o console do navegador e verifique se as requisições estão funcionando.

## 🔒 Configurações de Segurança

### CORS na API

No arquivo `api/server.js`, configure o CORS:

```javascript
app.use(cors({
  origin: ['https://matheus-c-martins.github.io'],
  methods: ['GET'],
  credentials: true
}));
```

### Rate Limiting

Já configurado em `api/middleware/rateLimiter.js`

## 🔍 Implementar Scraping Real

### Importante:

O sistema atual usa dados mockados para demonstração. Para implementar scraping real:

### 1. Usar APIs Oficiais (Recomendado)

```javascript
// Exemplo com Skyscanner API
const response = await axios.get('https://api.skyscanner.net/...', {
  headers: {
    'x-api-key': process.env.SKYSCANNER_API_KEY
  }
});
```

### 2. Web Scraping com Puppeteer

```javascript
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://www.voeazul.com.br/ofertas');
const deals = await page.evaluate(() => {
  // Extrair dados da página
});
```

### 3. Respeitar robots.txt

Sempre verifique o `robots.txt` dos sites antes de fazer scraping.

### 4. APIs para Voos

- **Skyscanner API:** https://developers.skyscanner.net/
- **Amadeus API:** https://developers.amadeus.com/
- **Kiwi.com API:** https://docs.kiwi.com/

### 5. APIs para Cruzeiros

- Verificar disponibilidade de APIs oficiais das empresas
- Alternativa: scraping respeitoso

## ⏰ Configurar Agendamento

### No Render/Railway (cron jobs)

Adicionar em `api/server.js`:

```javascript
import cron from 'node-cron';

// Executar scraping a cada 30 minutos
cron.schedule('*/30 * * * *', async () => {
  await scrapeFlights();
  await scrapeCruises();
});
```

### Serviços de Cron Externos

- **cron-job.org:** Fazer requisições HTTP para sua API
- **Zapier:** Agendar ações
- **GitHub Actions:** Executar scripts agendados

## 📈 Monitoramento

### Logs

```bash
# Ver logs no Render
render logs -f

# Ver logs no Railway
railway logs
```

### Uptime Monitoring

- **UptimeRobot:** https://uptimerobot.com
- **Pingdom:** https://www.pingdom.com

## 💾 Banco de Dados (Opcional)

Para produção, considere usar banco de dados:

### MongoDB Atlas (Gratuito)

```javascript
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI);
```

### PostgreSQL (Render/Railway)

Ambos oferecem PostgreSQL gratuito.

## ✅ Checklist de Deploy

- [ ] Backend API deployado e funcionando
- [ ] URL da API configurada no frontend
- [ ] CORS configurado corretamente
- [ ] Variáveis de ambiente configuradas
- [ ] Frontend deployado no GitHub Pages
- [ ] Scraping real implementado (se aplicável)
- [ ] Rate limiting ativado
- [ ] Logs e monitoramento configurados
- [ ] Testes realizados

## 🐛 Debug

### Problema: API não responde

```bash
# Verificar logs
render logs -f

# Testar localmente
cd api
npm start
curl http://localhost:3001/api/health
```

### Problema: CORS

Verifique se a origem está permitida em `api/server.js`

### Problema: Ofertas não aparecem

Verifique o console do navegador e os logs da API.

## 📚 Recursos

- [Render Docs](https://render.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages](https://docs.github.com/en/pages)

## 👨‍💻 Suporte

Para dúvidas, abra uma issue no GitHub.
