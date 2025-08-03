# 🚀 Hướng dẫn Deploy Hymovie

## 📋 Chuẩn bị trước khi deploy

### 1. Cài đặt môi trường development
```bash
# Windows
scripts\setup-dev.bat

# Linux/Mac
chmod +x scripts/setup-dev.sh
./scripts/setup-dev.sh
```

### 2. Cấu hình Environment Variables

#### Frontend (.env.production)
```bash
VITE_API_URL=https://your-backend-url.render.com/api
```

#### Backend (.env)
```bash
PORT=5000
NODE_ENV=production
# Thêm các biến khác nếu cần
```

## 🔄 Deploy lên Render (Backend)

### Bước 1: Tạo tài khoản Render
1. Đăng ký tại [render.com](https://render.com)
2. Kết nối GitHub repository

### Bước 2: Deploy Backend
1. Trên Render Dashboard, click **"New +"** → **"Web Service"**
2. Chọn repository `hymovie`
3. Cấu hình như sau:
   - **Name**: `hymovie-backend`
   - **Environment**: `Node`
   - **Region**: `Singapore` (gần Việt Nam nhất)
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Bước 3: Cấu hình Environment Variables trên Render
Trong phần **Environment**, thêm:
```
NODE_ENV=production
PORT=5000
```

### Bước 4: Deploy
- Click **"Create Web Service"**
- Đợi build và deploy hoàn thành
- Lưu lại URL backend (ví dụ: `https://hymovie-backend.onrender.com`)

## ▲ Deploy lên Vercel (Frontend)

### Bước 1: Cài đặt Vercel CLI
```bash
npm install -g vercel
```

### Bước 2: Login Vercel
```bash
vercel login
```

### Bước 3: Cấu hình Frontend
1. Cập nhật `client/.env.production`:
```bash
VITE_API_URL=https://hymovie-backend.onrender.com/api
```

2. Cập nhật `server/index.js` - thêm domain Vercel vào CORS:
```javascript
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://hymovie.vercel.app', 'https://hymovie-frontend.vercel.app'] // Thay đổi domain
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};
```

### Bước 4: Deploy Frontend
```bash
cd client
npm run deploy:vercel
```

### Bước 5: Cấu hình Environment Variables trên Vercel
1. Vào Vercel Dashboard → Project Settings → Environment Variables
2. Thêm:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://hymovie-backend.onrender.com/api`
   - **Environments**: Production, Preview

## 🔧 Deploy thủ công qua Vercel Dashboard

### Backend (Alternative)
1. Tạo project mới trên Vercel
2. Chọn repository
3. Cấu hình:
   - **Framework Preset**: Other
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Output Directory**: (để trống)
   - **Install Command**: `npm install`

### Frontend
1. Tạo project mới trên Vercel
2. Cấu hình:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

## 📱 Kiểm tra sau khi deploy

### Backend Health Check
```bash
curl https://your-backend-url.onrender.com/
```

### Frontend
- Truy cập URL Vercel của bạn
- Kiểm tra Network tab trong DevTools
- Đảm bảo API calls thành công

## 🔄 Auto Deploy

### Cấu hình Auto Deploy
- **Render**: Tự động deploy khi push code lên branch `main`
- **Vercel**: Tự động deploy mỗi khi có commit mới

### Deploy Branches khác
```bash
# Deploy branch feature
vercel --target preview

# Deploy production
vercel --prod
```

## 🛠 Troubleshooting

### Lỗi CORS
- Kiểm tra `corsOptions` trong `server/index.js`
- Đảm bảo frontend domain được thêm vào whitelist

### Environment Variables không load
- Kiểm tra tên biến có prefix `VITE_` cho frontend
- Restart deployment sau khi thay đổi env vars

### Build fails
```bash
# Clear cache và rebuild
npm run build:prod
```

### API không hoạt động
- Kiểm tra backend URL trong `.env.production`
- Kiểm tra network requests trong DevTools
- Kiểm tra logs trên Render dashboard

## 🔗 Useful Links

- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

## 📞 Support

Nếu gặp vấn đề, kiểm tra:
1. Console logs
2. Network tab trong DevTools
3. Render/Vercel deployment logs
4. Environment variables configuration
