# Deploy Guide cho Hymovie

## Domains hiện tại
- **Backend (Render)**: https://hymovie.onrender.com
- **Frontend (Vercel)**: https://hymovie.vercel.app

## ⚠️ Render Free Tier Limitations
- Server tự động **sleep sau 15 phút** không hoạt động
- Mất **30-60 giây** để wake up khi có request đầu tiên
- **Giải pháp đã implement:**
  - ✅ 60s timeout cho API requests
  - ✅ Đẹp loading spinner thay vì text loading
  - ✅ Smooth user experience
  - ✅ No intrusive wake-up notifications

## Vấn đề đã được giải quyết
✅ Backend URL đã được cấu hình đúng  
✅ CORS đã được setup cho frontend domain  
✅ Environment variables đã được cấu hình  
✅ Beautiful loading spinners thay vì text loading
✅ Smooth UX không có wake-up notifications

## Cách Deploy

### Option 1: Deploy tự động (Recommended)
```bash
npm run deploy:full
```

### Option 2: Deploy thủ công - Chỉ Client
```bash
cd client
npm run build:prod
vercel --prod
```

## Loading Experience

### Beautiful Red Spinners:
- 🔴 Đẹp red loading spinners thay vì text "Loading..."
- ⚡ Multiple sizes: small, medium, large, xlarge
- 🎨 Smooth animations
- 📱 Responsive design

### No Intrusive Notifications:
- ❌ Không có wake-up modals
- ❌ Không có server status messages
- ✅ Chỉ có clean loading spinners
- ✅ Natural waiting experience

## Cấu hình đã được thiết lập

### Client Environment (.env.production):
```
VITE_API_URL=https://hymovie.onrender.com/api
VITE_VIDSRC_BASE_URL=https://vidsrc.to/embed
```

### Server CORS:
```javascript
origin: [
  'https://hymovie.vercel.app',
  'https://hymovie-frontend.vercel.app'
]
```

### API Configuration:
- Timeout: 60 giây (cho server wake-up)
- Clean error handling
- Smooth loading transitions

## User Experience

### Khi server đang sleep:
1. � Hiển thị đẹp red loading spinner
2. ⏱️ User chờ naturally (30-60s)
3. ✅ Content load khi ready
4. 🎨 Smooth, clean experience

### Khi server đã wake up:
1. ✅ Normal loading spinner
2. 🚀 Fast performance

## Troubleshooting

### 1. Server take quá lâu để wake up:
- Wait 60-90 giây
- Click "Thử lại ngay"
- Check server status: `curl https://hymovie.onrender.com/health`

### 2. Server không wake up:
- Check Render dashboard
- Verify deployment logs
- Check domain: https://hymovie.onrender.com

### 3. Frequent sleeping:
- Consider upgrading to Render paid plan
- Use keep-alive service: `node keep-alive.js`
- Schedule periodic pings

## Commands hữu ích

```bash
# Development
npm run dev              # Chạy cả client và server
npm run dev:client       # Chỉ chạy client
npm run dev:server       # Chỉ chạy server

# Production Deploy
npm run deploy:full      # Deploy client với domain đã setup
cd client && vercel --prod  # Deploy client manually

# Server monitoring
curl https://hymovie.onrender.com/health  # Quick health check
node keep-alive.js       # Keep server awake

# Check API status
curl https://hymovie.onrender.com/api/trending
```

## Performance Tips

### For better user experience:
1. **First visit**: Expect 30-60s delay (server wake-up)
2. **Subsequent visits**: Normal speed if within 15 minutes
3. **Peak hours**: Less likely to sleep due to traffic
4. **Low traffic**: More likely to sleep

### To minimize impact:
- Keep-alive service during important demos
- Warm up server before presenting
- Consider paid hosting for production use
