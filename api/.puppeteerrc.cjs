const { join } = require('path');

/**
 * Configuração do Puppeteer
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};