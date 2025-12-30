import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

/**
 * Scraper para MSC Cruzeiros
 */
export async function scrapeMSC() {
  const deals = [];
  
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    console.log('🔍 Acessando MSC Cruzeiros...');
    await page.goto('https://www.msccruises.com.br/pt-br/Ofertas-Cruzeiros', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    await page.waitForSelector('[class*="cruise"], [class*="offer"]', { timeout: 10000 }).catch(() => {});
    
    const content = await page.content();
    const $ = cheerio.load(content);
    
    $('[class*="cruise-card"], [class*="offer"], [class*="promo"]').each((i, elem) => {
      try {
        const title = $(elem).find('h2, h3, [class*="title"], [class*="destination"]').first().text().trim();
        const priceText = $(elem).find('[class*="price"], [class*="valor"]').text();
        const link = $(elem).find('a').first().attr('href');
        const shipName = $(elem).find('[class*="ship"], [class*="navio"]').text().trim();
        const nightsText = $(elem).find('[class*="night"], [class*="noite"]').text();
        
        const priceMatch = priceText.match(/R?\$?\s*([\d.,]+)/g);
        if (!priceMatch) return;
        
        const prices = priceMatch.map(p => parseFloat(p.replace(/[^\d,]/g, '').replace(',', '.')));
        const currentPrice = Math.min(...prices);
        const originalPrice = currentPrice * 2.5;
        
        const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
        const nights = extractNights(nightsText || title);
        
        if (discount >= 50 && discount <= 90 && title && currentPrice > 0) {
          deals.push({
            id: `msc-${Date.now()}-${i}`,
            type: 'cruise',
            title: title,
            cruiseLine: 'MSC Cruzeiros',
            ship: shipName || 'MSC Seaside',
            ports: extractPorts(title),
            departureDate: getFutureDate(60),
            nights: nights,
            originalPrice: originalPrice,
            currentPrice: currentPrice,
            discount: discount,
            currency: 'BRL',
            url: link ? `https://www.msccruises.com.br${link}` : 'https://www.msccruises.com.br/pt-br/Ofertas-Cruzeiros',
            source: 'MSC Cruzeiros',
            verified: true,
            lastChecked: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
            cabinType: 'Interior'
          });
        }
      } catch (err) {
        console.error('Erro ao processar oferta MSC:', err.message);
      }
    });
    
    await browser.close();
    console.log(`✅ MSC: ${deals.length} ofertas encontradas`);
    
  } catch (error) {
    console.error('❌ Erro ao scraper MSC:', error.message);
  }
  
  return deals;
}

/**
 * Scraper para Costa Cruzeiros
 */
export async function scrapeCosta() {
  const deals = [];
  
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    console.log('🔍 Acessando Costa Cruzeiros...');
    await page.goto('https://www.costacruzeiros.com/ofertas.html', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    await page.waitForSelector('[class*="cruise"], [class*="offer"]', { timeout: 10000 }).catch(() => {});
    
    const content = await page.content();
    const $ = cheerio.load(content);
    
    $('[class*="cruise"], [class*="offer"], [class*="promo"]').each((i, elem) => {
      try {
        const title = $(elem).find('h2, h3, [class*="title"]').first().text().trim();
        const priceText = $(elem).find('[class*="price"]').text();
        const link = $(elem).find('a').first().attr('href');
        const shipName = $(elem).find('[class*="ship"]').text().trim();
        const nightsText = $(elem).text();
        
        const priceMatch = priceText.match(/R?\$?\s*([\d.,]+)/g);
        if (!priceMatch) return;
        
        const prices = priceMatch.map(p => parseFloat(p.replace(/[^\d,]/g, '').replace(',', '.')));
        const currentPrice = Math.min(...prices);
        const originalPrice = currentPrice * 2.3;
        
        const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
        const nights = extractNights(nightsText);
        
        if (discount >= 50 && discount <= 90 && title && currentPrice > 0) {
          deals.push({
            id: `costa-${Date.now()}-${i}`,
            type: 'cruise',
            title: title,
            cruiseLine: 'Costa Cruzeiros',
            ship: shipName || 'Costa Diadema',
            ports: extractPorts(title),
            departureDate: getFutureDate(60),
            nights: nights,
            originalPrice: originalPrice,
            currentPrice: currentPrice,
            discount: discount,
            currency: 'BRL',
            url: link ? `https://www.costacruzeiros.com${link}` : 'https://www.costacruzeiros.com/ofertas.html',
            source: 'Costa Cruzeiros',
            verified: true,
            lastChecked: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
            cabinType: 'Interior'
          });
        }
      } catch (err) {
        console.error('Erro ao processar oferta Costa:', err.message);
      }
    });
    
    await browser.close();
    console.log(`✅ Costa: ${deals.length} ofertas encontradas`);
    
  } catch (error) {
    console.error('❌ Erro ao scraper Costa:', error.message);
  }
  
  return deals;
}

/**
 * Scraper para Royal Caribbean
 */
export async function scrapeRoyalCaribbean() {
  const deals = [];
  
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    console.log('🔍 Acessando Royal Caribbean...');
    await page.goto('https://www.royalcaribbean.com/bra/pt/ofertas', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    await page.waitForSelector('[class*="cruise"], [class*="deal"]', { timeout: 10000 }).catch(() => {});
    
    const content = await page.content();
    const $ = cheerio.load(content);
    
    $('[class*="cruise"], [class*="deal"], [class*="offer"]').each((i, elem) => {
      try {
        const title = $(elem).find('h2, h3, [class*="title"]').first().text().trim();
        const priceText = $(elem).find('[class*="price"]').text();
        const link = $(elem).find('a').first().attr('href');
        const shipName = $(elem).find('[class*="ship"]').text().trim();
        const nightsText = $(elem).text();
        
        const priceMatch = priceText.match(/R?\$?\s*([\d.,]+)/g);
        if (!priceMatch) return;
        
        const prices = priceMatch.map(p => parseFloat(p.replace(/[^\d,]/g, '').replace(',', '.')));
        const currentPrice = Math.min(...prices);
        const originalPrice = currentPrice * 2.6;
        
        const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
        const nights = extractNights(nightsText);
        
        if (discount >= 50 && discount <= 90 && title && currentPrice > 0) {
          deals.push({
            id: `royal-${Date.now()}-${i}`,
            type: 'cruise',
            title: title,
            cruiseLine: 'Royal Caribbean',
            ship: shipName || 'Symphony of the Seas',
            ports: extractPorts(title),
            departureDate: getFutureDate(60),
            nights: nights,
            originalPrice: originalPrice,
            currentPrice: currentPrice,
            discount: discount,
            currency: 'BRL',
            url: link ? `https://www.royalcaribbean.com${link}` : 'https://www.royalcaribbean.com/bra/pt/ofertas',
            source: 'Royal Caribbean',
            verified: true,
            lastChecked: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
            cabinType: 'Interior'
          });
        }
      } catch (err) {
        console.error('Erro ao processar oferta Royal Caribbean:', err.message);
      }
    });
    
    await browser.close();
    console.log(`✅ Royal Caribbean: ${deals.length} ofertas encontradas`);
    
  } catch (error) {
    console.error('❌ Erro ao scraper Royal Caribbean:', error.message);
  }
  
  return deals;
}

// Funções auxiliares
function extractNights(text) {
  const match = text.match(/(\d+)\s*(?:noites|nights|días)/i);
  return match ? parseInt(match[1]) : 7;
}

function extractPorts(title) {
  const commonPorts = ['Miami', 'Caribe', 'Bahamas', 'Cozumel', 'Jamaica', 'Cancún', 'Santos', 'Buenos Aires', 'Montevidéu'];
  const foundPorts = commonPorts.filter(port => title.toLowerCase().includes(port.toLowerCase()));
  return foundPorts.length > 0 ? foundPorts : ['Vários portos'];
}

function getFutureDate(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}