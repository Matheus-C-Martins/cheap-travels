#!/usr/bin/env bash
# Optimized Render build script for free tier (512MB RAM)

set -e

echo "🧹 Cleaning up..."
rm -rf node_modules dist

echo "📦 Installing dependencies..."
npm ci --production=false --prefer-offline --no-audit

echo "🏗️  Building with optimized settings..."
# Use 460MB to leave room for system processes on 512MB instance
NODE_ENV=production NODE_OPTIONS="--max-old-space-size=460" npm run build

echo "✅ Build completed successfully!"
echo "📊 Build size:"
du -sh dist
