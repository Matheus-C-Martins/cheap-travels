import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dealsRouter from './routes/deals.js';
import { startScheduledScraping } from './services/scheduler.js';
import { rateLimiter } from './middleware/rateLimiter.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de segurança
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// Rotas
app.use('/api/deals', dealsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando' });
});

// Iniciar scraping agendado
startScheduledScraping();

app.listen(PORT, () => {
  console.log(`🚀 API rodando na porta ${PORT}`);
  console.log(`🔍 Sistema de rastreamento iniciado`);
});

export default app;