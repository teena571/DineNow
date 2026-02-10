@echo off
echo ========================================
echo    Starting DineNow Restaurant System
echo ========================================
echo.

REM Check if .env files exist
if not exist "backend\.env" (
    echo [WARNING] backend\.env not found!
    echo Please copy backend\.env.example to backend\.env and configure it.
    echo.
    pause
    exit /b 1
)

if not exist "frontend\.env" (
    echo [WARNING] frontend\.env not found!
    echo Please copy frontend\.env.example to frontend\.env and configure it.
    echo.
    pause
    exit /b 1
)

echo [1/3] Starting Backend Server (Port 5000)...
start "DineNow Backend" cmd /k "cd backend && npm run server"
timeout /t 3 /nobreak >nul

echo [2/3] Starting Frontend (Port 5173)...
start "DineNow Frontend" cmd /k "cd frontend && npm run dev"
timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo    DineNow is Starting!
echo ========================================
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:5000
echo.
echo Press any key to open DineNow in browser...
pause >nul
start http://localhost:5173
