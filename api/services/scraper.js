import puppeteer from 'puppeteer';
import axios from 'axios';
import * as cheerio from 'cheerio';

class TravelScraper {
  constructor() {
    this.deals = [];
  }

  async launchBrowser() {
    const isProduction = process.env.NODE_ENV === 'production';
    
    const browserOptions = {
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-software-rasterizer',
        '--disable-extensions',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
        '--disable-blink-features=AutomationControlled'
      ]
    };

    // On Render/production, use system Chrome
    if (isProduction) {
      browserOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium-browser';
    }

    try {
      return await puppeteer.launch(browserOptions);
    } catch (error) {
      console.error('Error launching browser:', error);
      throw error;
    }
  }

  async scrapeFlightDeals() {
    console.log('Starting flight deals scraping...');
    
    // Mock data for demonstration
    const mockFlights = [
      {
        id: 'flight-1',
        type: 'flight',
        title: 'S\u00e3o Paulo to Paris Round Trip',
        origin: 'S\u00e3o Paulo (GRU)',
        destination: 'Paris (CDG)',
        departureDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        stops: 0,
        originalPrice: 3500,
        currentPrice: 1890,
        discount: 46,
        currency: 'BRL',
        source: 'Skyscanner',
        url: 'https://www.skyscanner.com',
        scrapedAt: new Date().toISOString()
      },
      {
        id: 'flight-2',
        type: 'flight',
        title: 'Rio to London Direct Flight',
        origin: 'Rio de Janeiro (GIG)',
        destination: 'London (LHR)',
        departureDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
        stops: 0,
        originalPrice: 4200,
        currentPrice: 2100,
        discount: 50,
        currency: 'BRL',
        source: 'Google Flights',
        url: 'https://www.google.com/flights',
        scrapedAt: new Date().toISOString()
      }
    ];

    return mockFlights;
  }

  async scrapeCruiseDeals() {
    console.log('Starting cruise deals scraping...');
    
    // Mock data for demonstration
    const mockCruises = [
      {
        id: 'cruise-1',
        type: 'cruise',
        title: 'Mediterranean Cruise - 7 Nights',
        destination: 'Mediterranean Sea',
        departureDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        duration: 7,
        originalPrice: 5500,
        currentPrice: 3300,
        discount: 40,
        currency: 'BRL',
        source: 'CruiseDirect',
        url: 'https://www.cruisedirect.com',
        scrapedAt: new Date().toISOString()
      },
      {
        id: 'cruise-2',
        type: 'cruise',
        title: 'Caribbean Adventure - 5 Nights',
        destination: 'Caribbean',
        departureDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        duration: 5,
        originalPrice: 4000,
        currentPrice: 2400,
        discount: 40,
        currency: 'BRL',
        source: 'Carnival',
        url: 'https://www.carnival.com',
        scrapedAt: new Date().toISOString()
      }
    ];

    return mockCruises;
  }

  async scrapeAll() {
    console.log('Starting scraping process...');
    
    try {
      // For now, using mock data instead of actual scraping
      // This prevents issues with Puppeteer and Chrome on Render
      const flights = await this.scrapeFlightDeals();
      const cruises = await this.scrapeCruiseDeals();
      
      this.deals = [...flights, ...cruises];
      
      console.log(`Scraping completed. Found ${this.deals.length} deals.`);
      return this.deals;
    } catch (error) {
      console.error('Error during scraping:', error);
      // Return mock data even if scraping fails
      return this.deals.length > 0 ? this.deals : [];
    }
  }

  getDeals() {
    return this.deals;
  }
}

export default TravelScraper;