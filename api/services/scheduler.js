import cron from 'node-cron';
import { scrapeFlights, scrapeCruises } from './scraper.js';

/**
 * Inicia o agendamento de scraping automático
 */
export function startScheduledScraping() {
  console.log('⏰ Configurando scraping agendado...');

  // Executar scraping a cada 30 minutos
  cron.schedule('*/30 * * * *', async () => {
    console.log('\n🔄 Iniciando atualização automática de ofertas...');
    console.log(`📅 ${new Date().toLocaleString('pt-BR')}`);
    
    try {
      await Promise.all([
        scrapeFlights(),
        scrapeCruises()
      ]);
      console.log('✅ Atualização concluída com sucesso!\n');
    } catch (error) {
      console.error('❌ Erro na atualização automática:', error);
    }
  });

  // Executar imediatamente ao iniciar
  console.log('🚀 Executando primeira atualização...');
  Promise.all([
    scrapeFlights(),
    scrapeCruises()
  ]).then(() => {
    console.log('✅ Primeira atualização concluída!\n');
  }).catch(error => {
    console.error('❌ Erro na primeira atualização:', error);
  });

  console.log('✅ Scraping agendado: a cada 30 minutos');
}