import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dealsRouter from './routes/deals.js';
import { startScheduledScraping } from './services/scheduler.js';
import { rateLimiter } from './middleware/rateLimiter.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Configuração de CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware de segurança
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors(corsOptions));
app.use(express.json());
app.use(rateLimiter);

// Logging em produção
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rotas
app.use('/api/deals', dealsRouter);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API funcionando',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/', (req, res) => {
  res.json({
    name: 'Cheap Travels API',
    version: '1.0.0',
    description: 'Sistema de rastreamento de ofertas de viagens',
    endpoints: {
      health: '/api/health',
      allDeals: '/api/deals',
      flights: '/api/deals/flights',
      cruises: '/api/deals/cruises'
    },
    documentation: 'https://github.com/Matheus-C-Martins/cheap-travels'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint não encontrado',
    path: req.path
  });
});

// Iniciar scraping agendado
startScheduledScraping();

// Iniciar servidor
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(50));
  console.log('🚀 Cheap Travels API');
  console.log('='.repeat(50));
  console.log(`🌍 Servidor: http://localhost:${PORT}`);
  console.log(`📅 Iniciado: ${new Date().toLocaleString('pt-BR')}`);
  console.log(`⚙️  Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔍 Scraping: Ativo (a cada ${process.env.SCRAPE_INTERVAL_MINUTES || 30} minutos)`);
  console.log('='.repeat(50) + '\n');
});

export default app;