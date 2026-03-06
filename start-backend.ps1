# Start Backend Server
# Port: 5000

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "🚀 Starting DishDash Backend Server" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Prerequisites:" -ForegroundColor Yellow
Write-Host "  ✓ MySQL server running"
Write-Host "  ✓ Database 'food_delivery' set up"
Write-Host "  ✓ Environment variables configured in .env"
Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "./node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Build TypeScript
Write-Host "🔨 Building TypeScript..." -ForegroundColor Yellow
npm run build

# Start the server
Write-Host ""
Write-Host "🌐 Backend Server Details:" -ForegroundColor Cyan
Write-Host "  URL: http://localhost:5000" -ForegroundColor White
Write-Host "  API Base: http://localhost:5000/api" -ForegroundColor White
Write-Host ""

npm run dev
