# 🚀 Hướng dẫn setup Environment Variables trên Render

## 📋 Danh sách Environment Variables cần thiết

### Backend (Server) trên Render:
```bash
NODE_ENV=production
PORT=5000
TMDB_ACCESS_TOKEN=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmNkMmRiMjI5NjEwOTk1OThmZTkzNzUxOTBmYzdmMiIsIm5iZiI6MTc1MzA3MjY3NC4wMzIsInN1YiI6IjY4N2RjNDIyNzU4N2M0MjIyYWY3NmM3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3-xBh6zZdg4hv_1jxuwxPbGUOPYxW7sVoHkABQzacNI
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
TMDB_BACKDROP_BASE_URL=https://image.tmdb.org/t/p/original
VIDSRC_BASE_URL=https://vidsrc.to/embed
```

### Frontend (Client) trên Vercel:
```bash
VITE_API_URL=https://your-backend-service.onrender.com/api
```

## 🔧 Cách setup trên Render

### Phương pháp 1: Qua Dashboard (Khuyến nghị)

1. **Truy cập Render Dashboard**
   - Đăng nhập: https://render.com
   - Chọn service backend của bạn

2. **Vào tab Environment**
   - Click "Environment" ở sidebar
   - Click "Add Environment Variable"

3. **Thêm từng biến:**
   ```
   Key: NODE_ENV          Value: production
   Key: PORT              Value: 5000
   Key: TMDB_ACCESS_TOKEN Value: [your_token]
   Key: TMDB_BASE_URL     Value: https://api.themoviedb.org/3
   [... và các biến khác]
   ```

4. **Save & Deploy**
   - Click "Save Changes"
   - Service sẽ tự động redeploy

### Phương pháp 2: Qua Render Blueprint (render.yaml)

Tạo file `render.yaml` ở root project:

```yaml
services:
  - type: web
    name: hymovie-backend
    env: node
    rootDir: ./server
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5000
      - key: TMDB_ACCESS_TOKEN
        value: eyJhbGciOiJIUzI1NiJ9...
      - key: TMDB_BASE_URL
        value: https://api.themoviedb.org/3
      - key: TMDB_IMAGE_BASE_URL
        value: https://image.tmdb.org/t/p/w500
      - key: TMDB_BACKDROP_BASE_URL
        value: https://image.tmdb.org/t/p/original
      - key: VIDSRC_BASE_URL
        value: https://vidsrc.to/embed
```

### Phương pháp 3: Qua CLI (Nâng cao)

```bash
# Install Render CLI
npm install -g @render/cli

# Login
render login

# Set environment variables
render env:set NODE_ENV=production --service=your-service-id
render env:set PORT=5000 --service=your-service-id
render env:set TMDB_ACCESS_TOKEN=your_token --service=your-service-id
```

## 🚨 Lưu ý quan trọng

### Security Best Practices:
1. **Không commit .env files** vào Git
2. **Sensitive data** như API keys chỉ set trên production
3. **Validate environment** trong code

### Environment Validation (Thêm vào server/index.js):
```javascript
// Validate required environment variables
const requiredEnvVars = [
  'TMDB_ACCESS_TOKEN',
  'TMDB_BASE_URL'
];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
});

console.log('✅ All required environment variables are set');
```

## 🔄 Cách update Environment Variables

### Khi cần thay đổi:
1. Vào Render Dashboard → Service → Environment
2. Click vào biến cần sửa
3. Update value
4. Click "Save Changes"
5. Service sẽ tự động redeploy

### Bulk update (nhiều biến cùng lúc):
1. Prepare file `.env.production` locally
2. Copy-paste values vào Render Dashboard
3. Save all changes at once

## 🐛 Troubleshooting

### Lỗi thường gặp:
1. **"Missing environment variable"**
   - Check spelling của tên biến
   - Đảm bảo đã save changes trên Render

2. **"Service failed to start"**
   - Check logs: Dashboard → Service → Logs
   - Verify all required vars are set

3. **"CORS error"** 
   - Update CORS origins trong server code
   - Add frontend domain vào whitelist

## 📝 Checklist Deploy

- [ ] All environment variables set trên Render
- [ ] Frontend VITE_API_URL points to Render backend URL  
- [ ] CORS configured với frontend domain
- [ ] Service starts without errors
- [ ] Health check endpoint responds: `/`
- [ ] API endpoints work: `/api/movies/popular`

## 🔗 Quick Links

- [Render Environment Guide](https://render.com/docs/environment-variables)
- [Render Dashboard](https://dashboard.render.com)
- [Render Blueprint Docs](https://render.com/docs/blueprint-spec)
