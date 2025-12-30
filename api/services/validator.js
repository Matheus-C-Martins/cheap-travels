/**
 * Valida se uma oferta atende aos critérios mínimos
 * @param {Object} deal - Oferta a ser validada
 * @returns {boolean}
 */
export function validateDeal(deal) {
  // 1. Verificar campos obrigatórios
  if (!deal.title || !deal.currentPrice || !deal.originalPrice) {
    return false;
  }
  
  // 2. Calcular desconto
  const discount = Math.round(((deal.originalPrice - deal.currentPrice) / deal.originalPrice) * 100);
  
  // 3. Validar range de desconto (50-90%)
  if (discount < 50 || discount > 90) {
    return false;
  }
  
  // 4. Validar preços
  if (deal.currentPrice <= 0 || deal.originalPrice <= 0) {
    return false;
  }
  
  if (deal.currentPrice >= deal.originalPrice) {
    return false;
  }
  
  // 5. Validar URL
  if (deal.url && !deal.url.startsWith('http')) {
    return false;
  }
  
  // 6. Validar fonte
  const validSources = ['LATAM', 'Azul', 'GOL', 'MSC Cruzeiros', 'Costa Cruzeiros', 'Royal Caribbean'];
  if (!validSources.includes(deal.source)) {
    return false;
  }
  
  // 7. Validar tipo
  if (!['flight', 'cruise'].includes(deal.type)) {
    return false;
  }
  
  return true;
}

/**
 * Verifica se uma URL está ativa
 * @param {string} url - URL para verificar
 * @returns {Promise<boolean>}
 */
export async function isUrlActive() {
  // Implementação simplificada - pode ser expandida
  return true;
}