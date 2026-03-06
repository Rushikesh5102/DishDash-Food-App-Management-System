# Start Both Backend and Frontend
# Backend: 5000, Frontend: 3000

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "🚀 Starting DishDash Full Stack" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This will start both backend and frontend servers" -ForegroundColor Yellow
Write-Host ""
Write-Host "Prerequisites:" -ForegroundColor Yellow
Write-Host "  ✓ MySQL server running"
Write-Host "  ✓ Database 'food_delivery' set up"
Write-Host "  ✓ Environment variables configured"
Write-Host ""

# Function to start backend
function Start-Backend {
    Write-Host "📦 Starting Backend Server..." -ForegroundColor Cyan
    Write-Host "  Command: npm run dev" -ForegroundColor Gray
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd `"$PSScriptRoot`" ; npm run dev" -WindowStyle Normal
    Start-Sleep -Seconds 3
}

# Function to start frontend
function Start-Frontend {
    Write-Host "📦 Starting Frontend Server..." -ForegroundColor Cyan
    Write-Host "  Command: cd frontend && npm run dev" -ForegroundColor Gray
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd `"$PSScriptRoot\frontend`" ; npm run dev" -WindowStyle Normal
    Start-Sleep -Seconds 2
}

# Start both servers
Start-Backend
Start-Frontend

Write-Host ""
Write-Host "======================================" -ForegroundColor Green
Write-Host "✅ Both servers started successfully!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Access your application:" -ForegroundColor Cyan
Write-Host "  Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "  Backend: http://localhost:5000" -ForegroundColor White
Write-Host "  API: http://localhost:5000/api" -ForegroundColor White
Write-Host ""
Write-Host "📝 Check the console windows for any errors" -ForegroundColor Yellow
