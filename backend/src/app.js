const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const tradeRoutes = require('./routes/tradeRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ message: 'TradersHub API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/trades', tradeRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;
