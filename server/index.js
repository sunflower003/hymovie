const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  'TMDB_ACCESS_TOKEN',
  'TMDB_BASE_URL'
];

const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars);
  console.log('ℹ️  Please check your environment configuration');
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
} else {
  console.log('✅ All required environment variables are set');
}

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://hymovie.vercel.app',
        'https://hymovie-frontend.vercel.app',
        process.env.FRONTEND_URL
      ].filter(Boolean) // Remove undefined values
    : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security headers
app.use((req, res, next) => {
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  next();
});

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Hymovie API Server is running!',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    status: 'healthy',
    uptime: process.uptime()
  });
});

// Fast health check for wake-up detection
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Routes
try {
  app.use('/api/movies', require('./routes/movies'));
  app.use('/api/tv', require('./routes/tv'));
  app.use('/api/trending', require('./routes/trending'));
  app.use('/api/search', require('./routes/search'));
} catch (error) {
  console.error('Error loading routes:', error);
}

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { details: error.message })
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
