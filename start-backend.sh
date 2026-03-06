#!/bin/bash
# Start Backend Server
# Port: 5000

echo "======================================"
echo "🚀 Starting DishDash Backend Server"
echo "======================================"
echo ""
echo "Prerequisites:"
echo "  ✓ MySQL server running"
echo "  ✓ Database 'food_delivery' set up"
echo "  ✓ Environment variables configured in .env"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build TypeScript
echo "🔨 Building TypeScript..."
npm run build

# Start the server
echo ""
echo "🌐 Backend Server Details:"
echo "  URL: http://localhost:5000"
echo "  API Base: http://localhost:5000/api"
echo ""

npm run dev
