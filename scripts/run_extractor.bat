@echo off
echo ╔══════════════════════════════════════════════════════════╗
echo ║   CodePen Template Batch Extractor                       ║
echo ║   Setting up environment...                              ║
echo ╚══════════════════════════════════════════════════════════╝
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://python.org
    pause
    exit /b 1
)

echo ✅ Python found
echo.

REM Check if playwright is installed
pip show playwright >nul 2>&1
if errorlevel 1 (
    echo 📦 Installing Playwright...
    pip install playwright
    echo 🌐 Installing Chromium browser...
    playwright install chromium
) else (
    echo ✅ Playwright already installed
)

echo.
echo 🚀 Starting template extraction...
echo.

REM Run the extractor
python batch_extract_templates.py

echo.
echo ✅ Extraction complete!
echo 📁 Check scraped-templates/ folder for results
echo.
pause
