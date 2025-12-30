/**
 * Configurações de scraping
 */

export const SCRAPING_CONFIG = {
  // Intervalo entre requests (ms)
  REQUEST_DELAY: 2000,
  
  // Timeout para páginas (ms)
  PAGE_TIMEOUT: 30000,
  
  // Máximo de scrapers simultâneos
  MAX_CONCURRENT: 2,
  
  // Retry em caso de falha
  MAX_RETRIES: 2,
  
  // Delay entre retries (ms)
  RETRY_DELAY: 5000,
  
  // User agents para rotação
  ROTATE_USER_AGENTS: true,
  
  // Usar proxies
  USE_PROXIES: false,
  
  // Headless mode
  HEADLESS: true,
  
  // Screenshots em caso de erro (debug)
  SCREENSHOT_ON_ERROR: false,
  
  // Diretório para screenshots
  SCREENSHOT_DIR: './debug/screenshots'
};

/**
 * Lista de seletores CSS comuns para diferentes tipos de elementos
 */
export const SELECTORS = {
  // Ofertas
  OFFERS: [
    '[class*="offer"]',
    '[class*="promo"]',
    '[class*="deal"]',
    '[class*="card"]',
    '[data-testid*="offer"]'
  ],
  
  // Títulos
  TITLES: [
    'h1', 'h2', 'h3',
    '[class*="title"]',
    '[class*="destination"]',
    '[class*="heading"]'
  ],
  
  // Preços
  PRICES: [
    '[class*="price"]',
    '[class*="valor"]',
    '[class*="value"]',
    '[class*="amount"]',
    '[data-testid*="price"]'
  ],
  
  // Links
  LINKS: ['a', '[href]']
};

/**
 * Regex patterns para extração de dados
 */
export const PATTERNS = {
  // Preços (BRL)
  PRICE_BRL: /R\$?\s*([\d.,]+)/gi,
  
  // Preços (USD/EUR)
  PRICE_INTL: /[USD$€£]\s*([\d.,]+)/gi,
  
  // Datas
  DATE: /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/g,
  
  // Noites
  NIGHTS: /(\d+)\s*(?:noites?|nights?|días?)/gi,
  
  // Descontos
  DISCOUNT: /(\d+)%\s*(?:off|desconto|discount)/gi
};