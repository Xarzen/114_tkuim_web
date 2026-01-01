require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cfo_team_db';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB 連線成功'))
  .catch((err) => console.error('❌ MongoDB 連線失敗:', err));

// Routes
const playerRoutes = require('./routes/playerRoutes');
app.use('/api/players', playerRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: '歡迎使用 CFO 戰隊選手管理系統 API',
    version: '1.0.0',
    endpoints: {
      players: '/api/players'
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: '找不到該路徑' 
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: '伺服器錯誤',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 伺服器運行於 http://localhost:${PORT}`);
});
