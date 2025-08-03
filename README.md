# Hymovie - Movie Streaming Platform

Ứng dụng streaming phim sử dụng React.js (frontend) và Node.js/Express (backend) với TMDB API.

## Tính năng

- 🎬 Xem danh sách phim trending, mới nhất
- 📺 Xem danh sách TV shows
- 🔍 Tìm kiếm phim/TV shows
- 📱 Responsive design
- 🎥 Video player với vidsrc.to
- 🔄 Navigation với React Router

## Cài đặt và chạy

### 1. Cài đặt dependencies

```bash
# Client
cd client
npm install

# Server  
cd ../server
npm install
```

### 2. Cấu hình environment variables

**Server (.env):**
```
PORT=5000
TMDB_ACCESS_TOKEN=your_tmdb_access_token_here
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
TMDB_BACKDROP_BASE_URL=https://image.tmdb.org/t/p/original
VIDSRC_BASE_URL=https://vidsrc.to/embed
```

**Client (.env):**
```
VITE_API_URL=http://localhost:5000/api
VITE_VIDSRC_BASE_URL=https://vidsrc.to/embed
```

### 3. Chạy ứng dụng

**Chạy cả client và server:**
```bash
cd client
npm run dev:full
```

**Hoặc chạy riêng biệt:**

```bash
# Terminal 1 - Server
cd server
npm run dev

# Terminal 2 - Client
cd client
npm run dev
```

## API Endpoints

- `GET /api/trending` - Trending content
- `GET /api/movies/popular` - Popular movies
- `GET /api/movies/latest` - Latest movies
- `GET /api/movies/:id` - Movie details
- `GET /api/tv/popular` - Popular TV shows
- `GET /api/tv/latest` - Latest TV shows
- `GET /api/tv/:id` - TV show details
- `GET /api/search` - Search content

## Cấu trúc project

```
hymovie/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── styles/        # CSS modules
│   └── .env
├── server/                # Node.js backend
│   ├── controllers/       # Request handlers
│   ├── routes/           # API routes
│   ├── services/         # External API services
│   └── .env
└── README.md
```

## Technology Stack

**Frontend:**
- React.js
- React Router DOM
- Axios
- Swiper.js
- CSS Modules

**Backend:**
- Node.js
- Express.js
- Axios
- CORS
- dotenv

**External APIs:**
- TMDB API (movie data)
- vidsrc.to (video streaming)

## Lấy TMDB Access Token

1. Truy cập [TMDB website](https://www.themoviedb.org/)
2. Tạo tài khoản và đăng nhập
3. Vào Settings > API
4. Trong phần "API Read Access Token", copy token và paste vào file .env
5. **Lưu ý**: Sử dụng "Access Token" chứ không phải "API Key"
