import rateLimit from 'express-rate-limit';

/**
 * Rate limiter para proteger a API de abuso
 * Limita a 100 requests por minuto por IP
 */
export const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 100, // Máximo de requests
  message: {
    success: false,
    error: 'Muitas requisições. Tente novamente em 1 minuto.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});