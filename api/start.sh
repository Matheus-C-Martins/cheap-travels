#!/bin/bash

# Script de inicialização para produção

echo "🚀 Iniciando Cheap Travels API..."
echo "📅 $(date)"
echo ""

# Verificar variáveis de ambiente
if [ -z "$PORT" ]; then
    echo "⚠️  PORT não definida, usando 3001"
    export PORT=3001
fi

echo "✅ Porta: $PORT"
echo "✅ Ambiente: $NODE_ENV"
echo ""

# Executar scraping inicial
echo "🔍 Executando scraping inicial..."
node services/scraper.js &
SCRAPER_PID=$!

# Aguardar scraping inicial (máximo 60 segundos)
sleep 5

# Iniciar servidor
echo "📡 Iniciando servidor..."
node server.js
