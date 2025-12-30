import { scrapeLATAM, scrapeAzul, scrapeGOL } from './scrapers/flightScrapers.js';
import { scrapeMSC, scrapeCosta, scrapeRoyalCaribbean } from './scrapers/cruiseScrapers.js';
import { validateDeal } from './validator.js';
import { saveDeals } from './dealsService.js';

/**
 * Scrape de ofertas de voos de todas as fontes
 */
export async function scrapeFlights() {
  console.log('\n🛫 ========== INICIANDO SCRAPING DE VOOS ==========');
  console.log(`📅 ${new Date().toLocaleString('pt-BR')}\n`);
  
  const allFlights = [];
  
  // Array de scrapers a executar
  const flightScrapers = [
    { name: 'LATAM', scraper: scrapeLATAM },
    { name: 'Azul', scraper: scrapeAzul },
    { name: 'GOL', scraper: scrapeGOL }
  ];
  
  // Executar scrapers em paralelo (máximo 2 simultâneos para não sobrecarregar)
  for (let i = 0; i < flightScrapers.length; i += 2) {
    const batch = flightScrapers.slice(i, i + 2);
    
    const results = await Promise.allSettled(
      batch.map(({ scraper }) => 
        scraper().catch(err => {
          console.error(`❌ Falha no scraper:`, err.message);
          return [];
        })
      )
    );
    
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const flights = result.value;
        console.log(`✅ ${batch[index].name}: ${flights.length} ofertas`);
        
        // Validar cada oferta
        flights.forEach(flight => {
          if (validateDeal(flight)) {
            allFlights.push(flight);
          }
        });
      }
    });
    
    // Pequeno delay entre batches
    if (i + 2 < flightScrapers.length) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // Filtrar apenas ofertas com 50-90% de desconto
  const validFlights = allFlights.filter(f => f.discount >= 50 && f.discount <= 90);
  
  // Remover duplicatas baseado no título
  const uniqueFlights = removeDuplicates(validFlights, 'title');
  
  saveDeals('flights', uniqueFlights);
  
  console.log(`\n✅ Total de voos válidos: ${uniqueFlights.length}`);
  console.log('🛫 ========== SCRAPING DE VOOS CONCLUÍDO ==========\n');
  
  return uniqueFlights;
}

/**
 * Scrape de ofertas de cruzeiros de todas as fontes
 */
export async function scrapeCruises() {
  console.log('\n🚢 ========== INICIANDO SCRAPING DE CRUZEIROS ==========');
  console.log(`📅 ${new Date().toLocaleString('pt-BR')}\n`);
  
  const allCruises = [];
  
  const cruiseScrapers = [
    { name: 'MSC', scraper: scrapeMSC },
    { name: 'Costa', scraper: scrapeCosta },
    { name: 'Royal Caribbean', scraper: scrapeRoyalCaribbean }
  ];
  
  // Executar scrapers em paralelo
  for (let i = 0; i < cruiseScrapers.length; i += 2) {
    const batch = cruiseScrapers.slice(i, i + 2);
    
    const results = await Promise.allSettled(
      batch.map(({ scraper }) => 
        scraper().catch(err => {
          console.error(`❌ Falha no scraper:`, err.message);
          return [];
        })
      )
    );
    
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const cruises = result.value;
        console.log(`✅ ${batch[index].name}: ${cruises.length} ofertas`);
        
        cruises.forEach(cruise => {
          if (validateDeal(cruise)) {
            allCruises.push(cruise);
          }
        });
      }
    });
    
    if (i + 2 < cruiseScrapers.length) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  const validCruises = allCruises.filter(c => c.discount >= 50 && c.discount <= 90);
  const uniqueCruises = removeDuplicates(validCruises, 'title');
  
  saveDeals('cruises', uniqueCruises);
  
  console.log(`\n✅ Total de cruzeiros válidos: ${uniqueCruises.length}`);
  console.log('🚢 ========== SCRAPING DE CRUZEIROS CONCLUÍDO ==========\n');
  
  return uniqueCruises;
}

/**
 * Remove duplicatas baseado em uma chave
 */
function removeDuplicates(array, key) {
  const seen = new Set();
  return array.filter(item => {
    const value = item[key].toLowerCase().trim();
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}

// Executar scraping se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('\n🚀 ========== EXECUTANDO SCRAPING MANUAL ==========\n');
  
  try {
    const [flights, cruises] = await Promise.all([
      scrapeFlights(),
      scrapeCruises()
    ]);
    
    console.log('\n📊 ========== RESUMO FINAL ==========');
    console.log(`✈️  Voos encontrados: ${flights.length}`);
    console.log(`🚢 Cruzeiros encontrados: ${cruises.length}`);
    console.log(`📦 Total de ofertas: ${flights.length + cruises.length}`);
    console.log('✅ ========== SCRAPING CONCLUÍDO COM SUCESSO ==========\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Erro fatal no scraping:', error);
    process.exit(1);
  }
}