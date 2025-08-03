@echo off
REM Script to setup Vercel environment variables (Windows)

echo 🚀 Setting up Vercel environment variables...

REM Frontend Environment Variables
echo 📱 Setting frontend environment variables...
vercel env add VITE_API_URL production
REM Enter: https://hymovie-backend.onrender.com/api

REM Backend Environment Variables (if deploying backend on Vercel)
echo 🖥️  Setting backend environment variables...
vercel env add NODE_ENV production
vercel env add TMDB_ACCESS_TOKEN production
vercel env add TMDB_BASE_URL production
vercel env add TMDB_IMAGE_BASE_URL production
vercel env add TMDB_BACKDROP_BASE_URL production
vercel env add VIDSRC_BASE_URL production

echo ✅ Environment variables setup complete!
echo Run 'vercel --prod' to deploy with new environment variables
pause
