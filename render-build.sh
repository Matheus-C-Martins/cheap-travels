#!/usr/bin/env bash
# Render build script with memory optimization

set -e

echo "Installing dependencies..."
npm ci --no-audit

echo "Running build with increased memory..."
export NODE_OPTIONS="--max-old-space-size=2048"
npm run build

echo "Build completed successfully!"