# Start backend and frontend in separate PowerShell windows.
# Backend: http://localhost:5000
# Frontend: http://localhost:3000

$projectRoot = $PSScriptRoot

Write-Host "Starting DishDash backend and frontend..."

Start-Process powershell -ArgumentList @(
  "-NoExit",
  "-Command",
  "Set-Location '$projectRoot'; npm run dev"
)

Start-Sleep -Seconds 2

Start-Process powershell -ArgumentList @(
  "-NoExit",
  "-Command",
  "Set-Location '$projectRoot\frontend'; npm run dev"
)

Write-Host "Frontend: http://localhost:3000"
Write-Host "Backend: http://localhost:5000"
