/**
 * Valida se uma oferta é legítima e atende aos critérios
 */
export function validateDeal(deal) {
  // Validações básicas
  if (!deal.originalPrice || !deal.currentPrice) {
    return false;
  }

  // Calcular desconto real
  const calculatedDiscount = Math.round(
    ((deal.originalPrice - deal.currentPrice) / deal.originalPrice) * 100
  );

  // Verificar se o desconto está entre 50-90%
  if (calculatedDiscount < 50 || calculatedDiscount > 90) {
    return false;
  }

  // Atualizar desconto calculado
  deal.discount = calculatedDiscount;

  // Verificar se a oferta não expirou
  if (deal.expiresAt && new Date(deal.expiresAt) < new Date()) {
    return false;
  }

  // Verificar se tem URL válida
  if (!deal.url || !deal.url.startsWith('http')) {
    return false;
  }

  // Verificar campos obrigatórios
  if (!deal.title || !deal.source) {
    return false;
  }

  return true;
}

/**
 * Verifica se a URL ainda está ativa e a oferta disponível
 */
export async function verifyDealUrl(url) {
  try {
    // Em produção, fazer request real para verificar
    // const response = await axios.head(url, { timeout: 5000 });
    // return response.status === 200;
    return true; // Mockado
  } catch (error) {
    return false;
  }
}

/**
 * Verifica a autenticidade do preço com a fonte
 */
export async function verifyPricing(deal) {
  // Em produção, fazer scraping da página para confirmar preço
  // Por enquanto, retorna true
  return true;
}