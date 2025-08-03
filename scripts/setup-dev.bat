@echo off
REM Deploy script for development (Windows)

echo 🚀 Starting development deployment...

REM Check if .env files exist
if not exist "client\.env.development" (
    echo ⚠️  Creating .env.development from example...
    copy "client\.env.example" "client\.env.development"
)

if not exist "server\.env" (
    echo ⚠️  Creating server .env from example...
    copy "server\.env.example" "server\.env"
)

REM Install dependencies
echo 📦 Installing dependencies...
cd client && npm install
cd ..\server && npm install
cd ..

echo ✅ Development setup complete!
echo Run 'npm run dev:full' in the client directory to start both frontend and backend
pause
