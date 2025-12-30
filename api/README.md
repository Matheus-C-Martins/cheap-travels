# Cheap Travels API

## 🎯 Sistema de Rastreamento de Ofertas

Backend para rastreamento automático e em tempo real de ofertas de passagens aéreas e cruzeiros com descontos de 50-90%.

## 🚀 Características

- ✅ Scraping automático de múltiplas fontes oficiais
- ✅ Validação rigorosa de cada oferta
- ✅ Atualização a cada 30 minutos
- ✅ Cache inteligente para performance
- ✅ Rate limiting para proteção
- ✅ Apenas ofertas reais verificadas

## 📦 Instalação

```bash
cd api
npm install
cp .env.example .env
npm run dev
```

## 🔌 Endpoints

### GET /api/deals
Retorna todas as ofertas (voos + cruzeiros)

### GET /api/deals/flights
Retorna apenas ofertas de voos

### GET /api/deals/cruises
Retorna apenas ofertas de cruzeiros

### GET /api/health
Verifica status da API

## 🔍 Fontes de Dados

### Voos
- Skyscanner
- Google Flights
- Kayak
- LATAM
- Azul
- GOL

### Cruzeiros
- MSC Cruzeiros
- Costa Cruzeiros
- Royal Caribbean
- CVC Cruzeiros

## 🛡️ Validação de Ofertas

Cada oferta passa por:
1. Validação de desconto (50-90%)
2. Verificação de URL ativa
3. Validação de data de expiração
4. Confirmação de preços
5. Verificação de fonte confiável

## ⏰ Atualização Automática

O sistema executa scraping automaticamente a cada 30 minutos para garantir ofertas atualizadas.

## 🔒 Segurança

- Helmet.js para headers seguros
- Rate limiting (100 req/min)
- CORS configurado
- Validação de dados

## 📊 Estrutura de Dados

### Voo
```json
{
  "id": "flight-123",
  "type": "flight",
  "title": "São Paulo → Lisboa",
  "airline": "TAP",
  "origin": "São Paulo (GRU)",
  "destination": "Lisboa (LIS)",
  "departureDate": "2026-03-15",
  "originalPrice": 8500,
  "currentPrice": 2550,
  "discount": 70,
  "url": "https://...",
  "verified": true
}
```

### Cruzeiro
```json
{
  "id": "cruise-123",
  "type": "cruise",
  "title": "Caribe 7 Noites",
  "cruiseLine": "MSC",
  "nights": 7,
  "originalPrice": 12000,
  "currentPrice": 3600,
  "discount": 70,
  "url": "https://...",
  "verified": true
}
```