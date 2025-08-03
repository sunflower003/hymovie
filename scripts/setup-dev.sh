#!/bin/bash

# Deploy script for development
echo "🚀 Starting development deployment..."

# Check if .env files exist
if [ ! -f "client/.env.development" ]; then
    echo "⚠️  Creating .env.development from example..."
    cp client/.env.example client/.env.development
fi

if [ ! -f "server/.env" ]; then
    echo "⚠️  Creating server .env from example..."
    cp server/.env.example server/.env
fi

# Install dependencies
echo "📦 Installing dependencies..."
cd client && npm install
cd ../server && npm install
cd ..

echo "✅ Development setup complete!"
echo "Run 'npm run dev:full' in the client directory to start both frontend and backend"
