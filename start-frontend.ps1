# Start Frontend Development Server
# Port: 3000

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "🎨 Starting DishDash Frontend" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Prerequisites:" -ForegroundColor Yellow
Write-Host "  ✓ Backend server running on port 5001"
Write-Host "  ✓ .env.local configured"
Write-Host ""

# Navigate to frontend directory
Set-Location frontend

# Check if node_modules exists
if (-not (Test-Path "./node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Start the development server
Write-Host ""
Write-Host "🌐 Frontend Details:" -ForegroundColor Cyan
Write-Host "  URL: http://localhost:3000" -ForegroundColor White
Write-Host "  Backend API: http://localhost:5001/api" -ForegroundColor White
Write-Host ""

npm run dev
