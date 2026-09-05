// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');

// dotenv.config();
// connectDB();

// const app = express();

// // CORS configuration - Allow all origins for development
// app.use(cors({
//   origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/api/ipos', require('./routes/ipoRoutes'));
// app.use('/api/auth', require('./routes/authRoutes'));

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
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
// });





const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// CORS configuration - Allow all for development
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173', '*'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/ipos', require('./routes/ipoRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ success: false, error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`🔓 CORS enabled for all origins`);
});