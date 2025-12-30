/**
 * Gerenciador de proxies para rotação
 * Ajuda a evitar bloqueios durante scraping
 */

const FREE_PROXIES = [
  // Adicionar proxies gratuitos ou usar serviço de proxy
  // Exemplo: 'http://proxy1.com:8080'
];

let currentProxyIndex = 0;

export function getNextProxy() {
  if (FREE_PROXIES.length === 0) {
    return null;
  }
  
  const proxy = FREE_PROXIES[currentProxyIndex];
  currentProxyIndex = (currentProxyIndex + 1) % FREE_PROXIES.length;
  return proxy;
}

export function getPuppeteerArgs(useProxy = false) {
  const args = [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu',
    '--window-size=1920x1080'
  ];
  
  if (useProxy) {
    const proxy = getNextProxy();
    if (proxy) {
      args.push(`--proxy-server=${proxy}`);
    }
  }
  
  return args;
}

export const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
];

export function getRandomUserAgent() {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}