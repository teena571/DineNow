#!/bin/bash

echo "🔧 Starting Render build process..."

# Set Node.js version
echo "📦 Setting Node.js version..."
node --version
npm --version

# Clean install
echo "🧹 Cleaning npm cache..."
npm cache clean --force

echo "📥 Installing dependencies..."
npm ci --only=production --no-audit --no-fund

echo "✅ Build complete!"