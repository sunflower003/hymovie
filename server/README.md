# Hymovie Server

Backend API server cho ứng dụng Hymovie sử dụng TMDB API.

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Tạo file `.env` và cấu hình:
```
PORT=5000
TMDB_ACCESS_TOKEN=your_tmdb_access_token_here
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
TMDB_BACKDROP_BASE_URL=https://image.tmdb.org/t/p/original
VIDSRC_BASE_URL=https://vidsrc.to/embed
```

3. Chạy server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Movies
- `GET /api/movies/popular` - Lấy danh sách phim phổ biến
- `GET /api/movies/latest` - Lấy danh sách phim mới nhất
- `GET /api/movies/:id` - Lấy chi tiết phim

### TV Shows
- `GET /api/tv/popular` - Lấy danh sách TV show phổ biến
- `GET /api/tv/latest` - Lấy danh sách TV show mới nhất
- `GET /api/tv/:id` - Lấy chi tiết TV show

### Trending
- `GET /api/trending?mediaType=all&timeWindow=day` - Lấy nội dung trending

### Search
- `GET /api/search?query=movie_name` - Tìm kiếm phim/TV show

## Cấu trúc thư mục

```
server/
├── controllers/     # Controllers xử lý request
├── routes/         # Định nghĩa routes
├── services/       # Services gọi API
├── .env           # Environment variables
├── index.js       # Main server file
└── package.json   # Dependencies
```
