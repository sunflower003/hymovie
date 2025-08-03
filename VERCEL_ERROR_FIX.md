# 🚀 Hướng dẫn sửa lỗi Environment Variables trên Vercel

## ❌ Lỗi gặp phải:
```
Environment Variable "VITE_API_URL" references Secret "vite_api_url", which does not exist.
```

## ✅ Cách khắc phục:

### Bước 1: Cập nhật vercel.json (Đã xong)
File `vercel.json` đã được cập nhật để không reference đến Secret.

### Bước 2: Setup Environment Variables trên Vercel Dashboard

1. **Truy cập Vercel Dashboard**
   - Đi đến: https://vercel.com/dashboard
   - Chọn project `hymovie-frontend`

2. **Vào Settings → Environment Variables**
   - Click tab "Settings"
   - Click "Environment Variables" ở sidebar

3. **Thêm Environment Variable**
   - Click "Add New"
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.onrender.com/api`
   - **Environments**: ✅ Production ✅ Preview ✅ Development
   - Click "Save"

### Bước 3: Redeploy project
- Vào tab "Deployments"
- Click "..." trên deployment mới nhất
- Click "Redeploy"

## 🔗 Backend URL Options:

### Option 1: Backend trên Render (Khuyến nghị)
```
VITE_API_URL=https://hymovie-backend.onrender.com/api
```

### Option 2: Backend trên Vercel
```
VITE_API_URL=https://hymovie-backend.vercel.app/api
```

### Option 3: Development (local)
```
VITE_API_URL=http://localhost:5000/api
```

## 📝 Checklist sau khi sửa:

- [ ] vercel.json không có `env` hay `build.env` sections
- [ ] Environment Variables được set trên Vercel Dashboard
- [ ] Project được redeploy
- [ ] API calls hoạt động bình thường

## 🐛 Nếu vẫn lỗi:

1. **Xóa toàn bộ Environment Variables cũ**
   - Vào Settings → Environment Variables
   - Xóa tất cả variables liên quan đến `vite_api_url`

2. **Tạo mới Environment Variable**
   - Tên: `VITE_API_URL` (không phải `vite_api_url`)
   - Value: URL backend thực tế

3. **Clear build cache**
   - Vào Settings → General
   - Scroll xuống "Danger Zone"
   - Click "Clear Build Cache"

## 💡 Tips:

- **Không sử dụng Secrets** cho URL công khai
- **Environment Variables** đủ cho frontend config
- **Kiểm tra tên biến** phải chính xác: `VITE_API_URL`
- **URL phải có protocol**: `https://` không phải `//`
