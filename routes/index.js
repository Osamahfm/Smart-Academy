// routes/index.js
const express = require('express');
const router = express.Router();

// Import route files
const courseRoutes = require('./courses');
const userRoutes = require('./users');

// Mount routers
router.use('/courses', courseRoutes);
router.use('/users', userRoutes);

module.exports = router;