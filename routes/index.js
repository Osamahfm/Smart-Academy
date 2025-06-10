// routes/index.js
const express = require('express');
const router = express.Router();
const connectDB= require('../config/db');
connectDB();

const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
app.use(express.json());
app.use('/api/auth', authRoutes);


// Import route files
const courseRoutes = require('./courses');
const userRoutes = require('./users');

// Mount routers
router.use('/courses', courseRoutes);
router.use('/users', userRoutes);

module.exports = router;