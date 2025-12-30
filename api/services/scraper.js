import axios from 'axios';
import * as cheerio from 'cheerio';
import { validateDeal } from './validator.js';
import { saveDeals } from './dealsService.js';

// Lista de fontes confiáveis para scraping
const FLIGHT_SOURCES = [
  {
    name: 'Skyscanner',
    url: 'https://www.skyscanner.com.br/ofertas',
    type: 'api' // Usar API oficial quando disponível
  },
  {
    name: 'Google Flights',
    url: 'https://www.google.com/travel/flights',
    type: 'scrape'
  },
  {
    name: 'Kayak',
    url: 'https://www.kayak.com.br/deals',
    type: 'api'
  },
  {
    name: 'LATAM',
    url: 'https://www.latam.com/pt_br/ofertas/',
    type: 'scrape'
  },
  {
    name: 'Azul',
    url: 'https://www.voeazul.com.br/br/pt/home/ofertas',
    type: 'scrape'
  },
  {
    name: 'GOL',
    url: 'https://www.voegol.com.br/pt/ofertas',
    type: 'scrape'
  }
];

const CRUISE_SOURCES = [
  {
    name: 'MSC Cruzeiros',
    url: 'https://www.msccruises.com.br/pt-br/Ofertas-Cruzeiros',
    type: 'scrape'
  },
  {
    name: 'Costa Cruzeiros',
    url: 'https://www.costacruzeiros.com/ofertas.html',
    type: 'scrape'
  },
  {
    name: 'Royal Caribbean',
    url: 'https://www.royalcaribbean.com/bra/pt/ofertas',
    type: 'scrape'
  },
  {
    name: 'CVC Cruzeiros',
    url: 'https://www.cvc.com.br/cruzeiros',
    type: 'scrape'
  }
];

/**
 * Scrape de ofertas de voos
 */
export async function scrapeFlights() {
  console.log('🔍 Iniciando scraping de voos...');
  const allFlights = [];

  for (const source of FLIGHT_SOURCES) {
    try {
      console.log(`📡 Buscando em ${source.name}...`);
      
      // Simulação de scraping (em produção, implementar scraping real)
      const flights = await scrapeFlightSource(source);
      
      // Validar cada oferta
      for (const flight of flights) {
        if (validateDeal(flight)) {
          allFlights.push(flight);
        }
      }
    } catch (error) {
      console.error(`❌ Erro ao buscar em ${source.name}:`, error.message);
    }
  }

  // Filtrar apenas ofertas com 50-90% de desconto
  const validFlights = allFlights.filter(f => f.discount >= 50 && f.discount <= 90);
  
  saveDeals('flights', validFlights);
  console.log(`✅ ${validFlights.length} voos válidos encontrados`);
  
  return validFlights;
}

/**
 * Scrape de ofertas de cruzeiros
 */
export async function scrapeCruises() {
  console.log('🔍 Iniciando scraping de cruzeiros...');
  const allCruises = [];

  for (const source of CRUISE_SOURCES) {
    try {
      console.log(`📡 Buscando em ${source.name}...`);
      
      const cruises = await scrapeCruiseSource(source);
      
      for (const cruise of cruises) {
        if (validateDeal(cruise)) {
          allCruises.push(cruise);
        }
      }
    } catch (error) {
      console.error(`❌ Erro ao buscar em ${source.name}:`, error.message);
    }
  }

  const validCruises = allCruises.filter(c => c.discount >= 50 && c.discount <= 90);
  
  saveDeals('cruises', validCruises);
  console.log(`✅ ${validCruises.length} cruzeiros válidos encontrados`);
  
  return validCruises;
}

/**
 * Scrape de uma fonte específica de voos
 */
async function scrapeFlightSource(source) {
  // NOTA: Implementação real requer scraping com Puppeteer ou APIs oficiais
  // Este é um exemplo da estrutura de dados esperada
  
  // Exemplo de dados mockados para demonstração
  return [
    {
      id: `flight-${Date.now()}-1`,
      type: 'flight',
      title: 'São Paulo → Lisboa',
      airline: 'TAP Air Portugal',
      origin: 'São Paulo (GRU)',
      destination: 'Lisboa (LIS)',
      departureDate: '2026-03-15',
      returnDate: '2026-03-25',
      originalPrice: 8500,
      currentPrice: 2550,
      discount: 70,
      currency: 'BRL',
      url: `${source.url}/sao-paulo-lisboa`,
      source: source.name,
      verified: true,
      lastChecked: new Date().toISOString(),
      expiresAt: '2026-01-15T23:59:59Z',
      stops: 0,
      cabinClass: 'Econômica'
    }
  ];
}

/**
 * Scrape de uma fonte específica de cruzeiros
 */
async function scrapeCruiseSource(source) {
  // Exemplo de dados mockados
  return [
    {
      id: `cruise-${Date.now()}-1`,
      type: 'cruise',
      title: 'Cruzeiro Caribe 7 Noites',
      cruiseLine: 'MSC Cruzeiros',
      ship: 'MSC Seaside',
      ports: ['Miami', 'Cozumel', 'Roatán', 'Costa Maya'],
      departureDate: '2026-04-10',
      nights: 7,
      originalPrice: 12000,
      currentPrice: 3600,
      discount: 70,
      currency: 'BRL',
      url: `${source.url}/caribe-7-noites`,
      source: source.name,
      verified: true,
      lastChecked: new Date().toISOString(),
      expiresAt: '2026-02-01T23:59:59Z',
      cabinType: 'Interior'
    }
  ];
}

// Executar scraping se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('🚀 Executando scraping manual...');
  await scrapeFlights();
  await scrapeCruises();
  console.log('✅ Scraping concluído!');
}