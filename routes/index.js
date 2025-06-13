const express = require('express');
const router = express.Router();

// Import route files
const authRoutes = require('./auth'); // Corrected path (no extra '/routes')
const courseRoutes = require('./courses');
const userRoutes = require('./users');

// Mount routes to router
router.use('/api/auth', authRoutes);
router.use('/courses', courseRoutes);
router.use('/users', userRoutes);

module.exports = router;