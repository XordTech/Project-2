const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const { initDb } = require('./config/db');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const activityRoutes = require('./routes/activities');
const levelRoutes = require('./routes/levels');
const progressRoutes = require('./routes/progress');
const leaderboardRoutes = require('./routes/leaderboard');
const teacherRoutes = require('./routes/teacher');
const reportRoutes = require('./routes/reports');
const challengeRoutes = require('./routes/challenges');

const app = express();
const PORT = process.env.PORT || 5000;

async function start() {
  await initDb();
  

  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/activities', activityRoutes);
  app.use('/api/levels', levelRoutes);
  app.use('/api/progress', progressRoutes);
  app.use('/api/leaderboard', leaderboardRoutes);
  app.use('/api/teacher', teacherRoutes);
  app.use('/api/reports', reportRoutes);
  app.use('/api/challenges', challengeRoutes);

  app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
  });

  app.listen(PORT, () => {
    console.log(`English Quest server running on port ${PORT}`);
  });
}

start();
