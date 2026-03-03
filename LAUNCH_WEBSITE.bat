@echo off
setlocal
title BestPvaShop Automation System

echo ===================================================
echo      BestPvaShop - Automated Launch System
echo ===================================================
echo.

:: 1. Check for Node.js
echo [1/4] Checking System Requirements...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    color 4
    echo [ERROR] Node.js is not installed.
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit
)
echo [OK] Node.js found.

:: 2. Check for required files
echo [2/4] Verifying File Integrity...
if not exist "server.cjs" (
    color 4
    echo [ERROR] server.cjs not found!
    pause
    exit
)
if not exist "index.html" (
    color 4
    echo [ERROR] index.html not found!
    pause
    exit
)
echo [OK] Core files verified.

:: 3. Start Server
echo [3/4] Starting Local Server...
echo.
echo      The server will run in a separate window.
echo      Do NOT close that window while using the site.
echo.

:: Start node server in a new minimized window
start "BestPvaShop Background Server" /min node server.cjs

:: Wait 2 seconds for server to boot
timeout /t 2 >nul

:: 4. Launch Browser
echo [4/4] Launching Website...
start http://localhost:3000

color 2
echo.
echo ===================================================
echo      SUCCESS! Website is Live.
echo ===================================================
echo.
echo You can now manage your website from the browser.
echo To stop the website, simply close the server window.
echo.
pause
