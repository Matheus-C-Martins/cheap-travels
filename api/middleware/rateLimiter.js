import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 100, // 100 requests
  duration: 60, // por 60 segundos
});

export async function rateLimiter(req, res, next) {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (error) {
    res.status(429).json({
      success: false,
      error: 'Muitas requisições. Tente novamente em alguns segundos.'
    });
  }
}