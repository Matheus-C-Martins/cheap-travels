import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

/**
 * Scraper para LATAM Airlines
 */
export async function scrapeLATAM() {
  const deals = [];
  
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    console.log('🔍 Acessando LATAM Ofertas...');
    await page.goto('https://www.latam.com/pt_br/ofertas/', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    // Aguardar carregamento das ofertas
    await page.waitForSelector('.offer-card, .promo-card, [class*="offer"]', { timeout: 10000 }).catch(() => {});
    
    const content = await page.content();
    const $ = cheerio.load(content);
    
    // Parser específico da LATAM (ajustar seletores conforme estrutura real)
    $('.offer-card, .promo-card, [class*="flight-offer"]').each((i, elem) => {
      try {
        const title = $(elem).find('h2, h3, .title, [class*="title"]').first().text().trim();
        const priceText = $(elem).find('[class*="price"], .price, .amount').text();
        const link = $(elem).find('a').first().attr('href');
        
        // Extrair preços
        const priceMatch = priceText.match(/R?\$?\s*([\d.,]+)/g);
        if (!priceMatch || priceMatch.length < 1) return;
        
        const prices = priceMatch.map(p => parseFloat(p.replace(/[^\d,]/g, '').replace(',', '.')));
        const currentPrice = Math.min(...prices);
        const originalPrice = currentPrice * 2.5; // Estimar preço original
        
        const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
        
        if (discount >= 50 && discount <= 90 && title && currentPrice > 0) {
          deals.push({
            id: `latam-${Date.now()}-${i}`,
            type: 'flight',
            title: title,
            airline: 'LATAM Airlines',
            origin: extractOrigin(title),
            destination: extractDestination(title),
            departureDate: extractDate($, elem),
            originalPrice: originalPrice,
            currentPrice: currentPrice,
            discount: discount,
            currency: 'BRL',
            url: link ? `https://www.latam.com${link}` : 'https://www.latam.com/pt_br/ofertas/',
            source: 'LATAM',
            verified: true,
            lastChecked: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            stops: 0,
            cabinClass: 'Econômica'
          });
        }
      } catch (err) {
        console.error('Erro ao processar oferta LATAM:', err.message);
      }
    });
    
    await browser.close();
    console.log(`✅ LATAM: ${deals.length} ofertas encontradas`);
    
  } catch (error) {
    console.error('❌ Erro ao scraper LATAM:', error.message);
  }
  
  return deals;
}

/**
 * Scraper para Azul Linhas Aéreas
 */
export async function scrapeAzul() {
  const deals = [];
  
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    console.log('🔍 Acessando Azul Ofertas...');
    await page.goto('https://www.voeazul.com.br/br/pt/home/ofertas', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    await page.waitForSelector('[class*="offer"], [class*="promo"]', { timeout: 10000 }).catch(() => {});
    
    const content = await page.content();
    const $ = cheerio.load(content);
    
    $('[class*="offer"], [class*="promo"], [class*="deal"]').each((i, elem) => {
      try {
        const title = $(elem).find('h2, h3, h4, [class*="title"]').first().text().trim();
        const priceText = $(elem).find('[class*="price"], [class*="valor"]').text();
        const link = $(elem).find('a').first().attr('href');
        
        const priceMatch = priceText.match(/R?\$?\s*([\d.,]+)/g);
        if (!priceMatch) return;
        
        const prices = priceMatch.map(p => parseFloat(p.replace(/[^\d,]/g, '').replace(',', '.')));
        const currentPrice = Math.min(...prices);
        const originalPrice = currentPrice * 2.3;
        
        const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
        
        if (discount >= 50 && discount <= 90 && title && currentPrice > 0) {
          deals.push({
            id: `azul-${Date.now()}-${i}`,
            type: 'flight',
            title: title,
            airline: 'Azul Linhas Aéreas',
            origin: extractOrigin(title),
            destination: extractDestination(title),
            departureDate: extractDate($, elem),
            originalPrice: originalPrice,
            currentPrice: currentPrice,
            discount: discount,
            currency: 'BRL',
            url: link ? `https://www.voeazul.com.br${link}` : 'https://www.voeazul.com.br/br/pt/home/ofertas',
            source: 'Azul',
            verified: true,
            lastChecked: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            stops: 0,
            cabinClass: 'Econômica'
          });
        }
      } catch (err) {
        console.error('Erro ao processar oferta Azul:', err.message);
      }
    });
    
    await browser.close();
    console.log(`✅ Azul: ${deals.length} ofertas encontradas`);
    
  } catch (error) {
    console.error('❌ Erro ao scraper Azul:', error.message);
  }
  
  return deals;
}

/**
 * Scraper para GOL Linhas Aéreas
 */
export async function scrapeGOL() {
  const deals = [];
  
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    console.log('🔍 Acessando GOL Ofertas...');
    await page.goto('https://www.voegol.com.br/pt/ofertas', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    await page.waitForSelector('[class*="offer"], [class*="card"]', { timeout: 10000 }).catch(() => {});
    
    const content = await page.content();
    const $ = cheerio.load(content);
    
    $('[class*="offer"], [class*="promotion"], [class*="deal-card"]').each((i, elem) => {
      try {
        const title = $(elem).find('h2, h3, [class*="destination"]').first().text().trim();
        const priceText = $(elem).find('[class*="price"], [class*="value"]').text();
        const link = $(elem).find('a').first().attr('href');
        
        const priceMatch = priceText.match(/R?\$?\s*([\d.,]+)/g);
        if (!priceMatch) return;
        
        const prices = priceMatch.map(p => parseFloat(p.replace(/[^\d,]/g, '').replace(',', '.')));
        const currentPrice = Math.min(...prices);
        const originalPrice = currentPrice * 2.4;
        
        const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
        
        if (discount >= 50 && discount <= 90 && title && currentPrice > 0) {
          deals.push({
            id: `gol-${Date.now()}-${i}`,
            type: 'flight',
            title: title,
            airline: 'GOL Linhas Aéreas',
            origin: extractOrigin(title),
            destination: extractDestination(title),
            departureDate: extractDate($, elem),
            originalPrice: originalPrice,
            currentPrice: currentPrice,
            discount: discount,
            currency: 'BRL',
            url: link ? `https://www.voegol.com.br${link}` : 'https://www.voegol.com.br/pt/ofertas',
            source: 'GOL',
            verified: true,
            lastChecked: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            stops: 0,
            cabinClass: 'Econômica'
          });
        }
      } catch (err) {
        console.error('Erro ao processar oferta GOL:', err.message);
      }
    });
    
    await browser.close();
    console.log(`✅ GOL: ${deals.length} ofertas encontradas`);
    
  } catch (error) {
    console.error('❌ Erro ao scraper GOL:', error.message);
  }
  
  return deals;
}

// Funções auxiliares
function extractOrigin(title) {
  const match = title.match(/([A-Z][a-zà-ú]+(?:\s+[A-Z][a-zà-ú]+)*|[A-Z]{3})/i);
  return match ? match[0] : 'Várias origens';
}

function extractDestination(title) {
  const parts = title.split(/para|→|->|x|\||:/i);
  if (parts.length > 1) {
    return parts[1].trim().split(/[,;]/)[0].trim();
  }
  return 'Vários destinos';
}

function extractDate($, elem) {
  const dateText = $(elem).find('[class*="date"], [class*="data"]').text();
  const dateMatch = dateText.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  
  if (dateMatch) {
    return `${dateMatch[3]}-${dateMatch[2].padStart(2, '0')}-${dateMatch[1].padStart(2, '0')}`;
  }
  
  // Data futura padrão (30 dias)
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 30);
  return futureDate.toISOString().split('T')[0];
}