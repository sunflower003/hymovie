# 🚀 Vercel Environment Variables Setup Guide

## 📋 Environment Variables cần thiết

### 🔥 **Frontend (Client) - BẮT BUỘC**
```bash
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### 🔥 **Backend (Server) - Nếu deploy trên Vercel**
```bash
NODE_ENV=production
TMDB_ACCESS_TOKEN=eyJhbGciOiJIUzI1NiJ9...
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
TMDB_BACKDROP_BASE_URL=https://image.tmdb.org/t/p/original
VIDSRC_BASE_URL=https://vidsrc.to/embed
```

## 🎯 **Cách setup qua Vercel Dashboard**

### Bước 1: Deploy Backend trước (Render)
1. Deploy backend lên Render trước
2. Lấy URL backend: `https://hymovie-backend.onrender.com`

### Bước 2: Setup Frontend trên Vercel
1. **Tạo Project:**
   - Vercel Dashboard → "Add New..." → "Project"
   - Import từ GitHub: `hymovie` repository
   - **Root Directory**: `client`
   - **Framework Preset**: Vite

2. **Configure Build:**
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Environment Variables:**
   - Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://hymovie-backend.onrender.com/api`
   - Apply to: ✅ Production ✅ Preview ✅ Development

### Bước 3: Deploy Backend trên Vercel (Optional)
1. **Tạo Project thứ 2:**
   - **Root Directory**: `server`
   - **Framework Preset**: Other

2. **Environment Variables:**
   ```
   NODE_ENV = production
   TMDB_ACCESS_TOKEN = [your_token]
   TMDB_BASE_URL = https://api.themoviedb.org/3
   TMDB_IMAGE_BASE_URL = https://image.tmdb.org/t/p/w500
   TMDB_BACKDROP_BASE_URL = https://image.tmdb.org/t/p/original
   VIDSRC_BASE_URL = https://vidsrc.to/embed
   ```

## ⚡ **Cách setup qua CLI (Nhanh hơn)**

### Frontend:
```bash
cd client
vercel

# Khi được hỏi về environment variables:
# VITE_API_URL: https://hymovie-backend.onrender.com/api

# Deploy production:
vercel --prod
```

### Backend (if needed):
```bash
cd server
vercel

# Add environment variables khi deploy
vercel env add NODE_ENV
vercel env add TMDB_ACCESS_TOKEN
# ... thêm các biến khác

vercel --prod
```

## 🔧 **Kiểm tra Environment Variables**

### Trong code, add debug log:
```javascript
// client/src/services/tmdbApi.js
console.log('API URL:', import.meta.env.VITE_API_URL);

// server/index.js  
console.log('Environment:', process.env.NODE_ENV);
console.log('TMDB configured:', !!process.env.TMDB_ACCESS_TOKEN);
```

## 🚨 **Troubleshooting**

### ❌ "API calls failing"
- Check `VITE_API_URL` trỏ đúng backend URL
- Kiểm tra CORS settings trong backend
- Test API trực tiếp: `https://backend-url.com/api/movies/popular`

### ❌ "Environment variables not loading"
- Redeploy project sau khi thêm env vars
- Check variable names (phải có prefix `VITE_` cho frontend)
- Verify environments (Production/Preview/Development)

### ❌ "CORS error"
Update backend CORS settings:
```javascript
const corsOptions = {
  origin: [
    'https://your-app.vercel.app',
    'https://your-app-git-main.vercel.app', 
    'https://your-app-preview.vercel.app'
  ]
};
```

## 📱 **Deployment Architecture**

```
┌─────────────────┐    API calls    ┌──────────────────┐
│   Frontend      │ ──────────────► │    Backend       │
│   (Vercel)      │                 │   (Render)       │
│                 │                 │                  │
│ VITE_API_URL ─────────────────────► PORT=5000        │
└─────────────────┘                 │ TMDB_ACCESS_TOKEN│
                                    │ NODE_ENV=prod    │
                                    └──────────────────┘
```

## ✅ **Checklist trước khi deploy**

- [ ] Backend deployed và running trên Render
- [ ] Frontend `VITE_API_URL` configured
- [ ] CORS whitelist includes Vercel domains
- [ ] All environment variables set
- [ ] Test API endpoints manually
- [ ] Frontend builds successfully locally: `npm run build`

## 🔗 **Quick Commands**

```bash
# Test local build with production env
npm run build:prod
npm run preview

# Deploy to Vercel
npm run deploy:vercel

# Check deployment status
vercel ls
```
