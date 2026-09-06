const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// CORS configuration - FIX THIS
const corsOptions = {
  origin: [
    'https://ipo-tracker-frontend.onrender.com',
    'https://ipo-tracker-frontend.onrender.com',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'IPO Tracker API',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      ipos: '/api/ipos'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'IPO Tracker Pro API',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/ipos', require('./routes/ipoRoutes'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    success: false, 
    error: err.message || 'Something went wrong!'
  });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health: https://ipo-tracker-api.onrender.com/api/health`);
});











// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');

// dotenv.config();
// connectDB();

// const app = express();

// // ---------------------------------------------------------------------------------------------------
// // Add this before your other routes
// app.get('/', (req, res) => {
//   res.json({
//     message: 'IPO Tracker API',
//     status: 'running',
//     endpoints: {
//       health: '/api/health',
//       auth: '/api/auth',
//       ipos: '/api/ipos'
//     }
//   });
// });



// // ------------------------------------------------------------------


// // CORS configuration - Allow all for development
// app.use(cors({
//   origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173', '*'],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/api/ipos', require('./routes/ipoRoutes'));
// app.use('/api/auth', require('./routes/authRoutes'));

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('Error:', err.stack);
//   res.status(500).json({ success: false, error: 'Something went wrong!' });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ success: false, error: 'Route not found' });
// });

// const PORT = process.env.PORT || 5002;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📍 http://localhost:${PORT}`);
//   console.log(`🔓 CORS enabled for all origins`);
// });
