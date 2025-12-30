const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Buscar todas as ofertas
 */
export async function fetchAllDeals() {
  try {
    const response = await fetch(`${API_URL}/deals`);
    if (!response.ok) throw new Error('Erro ao buscar ofertas');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar ofertas:', error);
    throw error;
  }
}

/**
 * Buscar ofertas de voos
 */
export async function fetchFlightDeals() {
  try {
    const response = await fetch(`${API_URL}/deals/flights`);
    if (!response.ok) throw new Error('Erro ao buscar voos');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar voos:', error);
    throw error;
  }
}

/**
 * Buscar ofertas de cruzeiros
 */
export async function fetchCruiseDeals() {
  try {
    const response = await fetch(`${API_URL}/deals/cruises`);
    if (!response.ok) throw new Error('Erro ao buscar cruzeiros');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar cruzeiros:', error);
    throw error;
  }
}