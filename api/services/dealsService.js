import NodeCache from 'node-cache';

// Cache de 5 minutos
const cache = new NodeCache({ stdTTL: 300 });

// Armazenamento em memória (em produção, usar banco de dados)
let dealsDatabase = {
  flights: [],
  cruises: []
};

export function saveDeals(type, deals) {
  if (type === 'flights') {
    dealsDatabase.flights = deals;
  } else if (type === 'cruises') {
    dealsDatabase.cruises = deals;
  }
  cache.del('all_deals');
  cache.del(`${type}_deals`);
}

export async function getAllDeals() {
  const cached = cache.get('all_deals');
  if (cached) return cached;
  
  const allDeals = [...dealsDatabase.flights, ...dealsDatabase.cruises]
    .sort((a, b) => b.discount - a.discount);
  
  cache.set('all_deals', allDeals);
  return allDeals;
}

export async function getFlightDeals() {
  const cached = cache.get('flights_deals');
  if (cached) return cached;
  
  const flights = dealsDatabase.flights.sort((a, b) => b.discount - a.discount);
  cache.set('flights_deals', flights);
  return flights;
}

export async function getCruiseDeals() {
  const cached = cache.get('cruises_deals');
  if (cached) return cached;
  
  const cruises = dealsDatabase.cruises.sort((a, b) => b.discount - a.discount);
  cache.set('cruises_deals', cruises);
  return cruises;
}