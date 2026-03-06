#!/bin/bash
# Start Frontend Development Server
# Port: 3000

echo "======================================"
echo "🎨 Starting DishDash Frontend"
echo "======================================"
echo ""
echo "Prerequisites:"
echo "  ✓ Backend server running on port 5000"
echo "  ✓ .env.local configured"
echo ""

# Navigate to frontend directory
cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the development server
echo ""
echo "🌐 Frontend Details:"
echo "  URL: http://localhost:3000"
echo "  Backend API: http://localhost:5000/api"
echo ""

npm run dev
