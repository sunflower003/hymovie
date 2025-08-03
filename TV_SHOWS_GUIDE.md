# 📺 TV Shows Integration Guide

## 🎯 Tổng quan

Đã cập nhật VideoPlayer và MovieDetail để hỗ trợ đầy đủ TV shows với khả năng chọn season/episode theo VidSrc API specification.

## 🔧 Các thay đổi chính

### 1. **VideoPlayer Component**
- ✅ Hỗ trợ props `season` và `episode`
- ✅ Generate đúng URL format cho TV shows
- ✅ Fallback URLs theo VidSrc API spec
- ✅ Timeout handling tốt hơn

### 2. **MovieDetail Page**
- ✅ Episode selector cho TV shows
- ✅ Dynamic season/episode selection
- ✅ Auto-update video khi thay đổi

### 3. **Video Utils**
- ✅ `generateTVEmbedUrl()` - TV show URLs
- ✅ `generateMovieEmbedUrl()` - Movie URLs
- ✅ `generateFallbackUrls()` - Fallback sources
- ✅ `getVideoEmbedUrl()` - Unified interface

### 4. **EpisodeSelector Component**
- ✅ Reusable component cho TV episode selection
- ✅ Responsive design
- ✅ Customizable season/episode count

## 🎬 URL Formats được hỗ trợ

### Movies:
```javascript
// Primary
https://vidsrc.xyz/embed/movie?tmdb={tmdbId}&autoplay=1

// Fallbacks
https://vidsrc.to/embed/movie/{tmdbId}
https://vidsrc.xyz/embed/movie/{tmdbId}
https://vidsrc.cc/v2/embed/movie/{tmdbId}
https://embed.su/embed/movie/{tmdbId}
```

### TV Shows:
```javascript
// Primary
https://vidsrc.xyz/embed/tv?tmdb={tmdbId}&season={season}&episode={episode}&autoplay=1&autonext=1

// Fallbacks
https://vidsrc.to/embed/tv/{tmdbId}/{season}/{episode}
https://vidsrc.xyz/embed/tv/{tmdbId}/{season}-{episode}
https://vidsrc.cc/v2/embed/tv/{tmdbId}/{season}/{episode}
https://embed.su/embed/tv/{tmdbId}/{season}/{episode}
```

## 💻 Cách sử dụng

### Basic Usage:
```jsx
// Movie
<VideoPlayer 
  movieId={12345}
  mediaType="movie"
  title="Movie Title"
/>

// TV Show
<VideoPlayer 
  movieId={67890}
  mediaType="tv"
  season={1}
  episode={5}
  title="TV Show Title"
/>
```

### Advanced Usage với custom options:
```jsx
import { getVideoEmbedUrl } from '../utils/videoUtils';

const customSrc = getVideoEmbedUrl({
  tmdbId: 12345,
  mediaType: 'tv',
  season: 2,
  episode: 10,
  options: {
    autoplay: true,
    autonext: true,
    ds_lang: 'en'
  }
});

<VideoPlayer 
  src={customSrc}
  movieId={12345}
  mediaType="tv"
  season={2}
  episode={10}
/>
```

## 🎨 UI Features

### Episode Selector:
- Dropdown cho Season selection
- Dropdown cho Episode selection
- Auto-update video khi thay đổi
- Responsive design cho mobile

### Error Handling:
- Automatic fallback sources
- Retry mechanism
- Clear error messages
- Loading states

## 📱 Mobile Optimization

- ✅ Responsive episode selector
- ✅ Touch-friendly dropdowns
- ✅ Optimized layout cho mobile
- ✅ Fast loading với lazy loading

## 🔄 Deployment Ready

- ✅ Production-optimized code
- ✅ Error suppression cho production
- ✅ Caching strategies
- ✅ SEO friendly

## 🧪 Testing

### Test Cases:
1. **Movie playback** - Basic movie loading
2. **TV show playback** - Season 1, Episode 1
3. **Episode switching** - Change season/episode
4. **Fallback handling** - URL failure scenarios
5. **Mobile responsive** - Touch interface
6. **Error recovery** - Retry mechanisms

### Example Test:
```javascript
// Test TV show URL generation
const tvUrl = getVideoEmbedUrl({
  tmdbId: 1399, // Game of Thrones
  mediaType: 'tv',
  season: 1,
  episode: 1
});

console.log(tvUrl);
// Expected: https://vidsrc.xyz/embed/tv?tmdb=1399&season=1&episode=1&autoplay=1&autonext=1
```

## 🐛 Troubleshooting

### Lỗi thường gặp:

1. **Video không load**
   - Check TMDB ID đúng
   - Verify season/episode exists
   - Check network connectivity

2. **Episode selector không hiện**
   - Ensure `mediaType="tv"`
   - Check `numberOfSeasons` prop

3. **Fallback không hoạt động**
   - Check console cho error logs
   - Verify timeout settings

## 🚀 Future Enhancements

- [ ] Auto-detect number of episodes per season
- [ ] Episode thumbnails preview
- [ ] Watchlist integration
- [ ] Continue watching từ episode cuối
- [ ] Multiple language subtitle support
- [ ] Picture-in-picture mode

## 📋 Checklist Deploy

- [x] VideoPlayer updated
- [x] MovieDetail updated
- [x] CSS styles added
- [x] Utils functions created
- [x] Error handling improved
- [x] Mobile responsive
- [x] Documentation complete

**Ready for production! 🎉**
