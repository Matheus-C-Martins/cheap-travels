import express from 'express';
import { getFlightDeals, getCruiseDeals, getAllDeals } from '../services/dealsService.js';

const router = express.Router();

// Obter todas as ofertas
router.get('/', async (req, res) => {
  try {
    const deals = await getAllDeals();
    res.json({
      success: true,
      count: deals.length,
      data: deals,
      lastUpdate: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar ofertas',
      message: error.message
    });
  }
});

// Obter ofertas de voos
router.get('/flights', async (req, res) => {
  try {
    const flights = await getFlightDeals();
    res.json({
      success: true,
      count: flights.length,
      data: flights,
      lastUpdate: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar voos',
      message: error.message
    });
  }
});

// Obter ofertas de cruzeiros
router.get('/cruises', async (req, res) => {
  try {
    const cruises = await getCruiseDeals();
    res.json({
      success: true,
      count: cruises.length,
      data: cruises,
      lastUpdate: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar cruzeiros',
      message: error.message
    });
  }
});

export default router;