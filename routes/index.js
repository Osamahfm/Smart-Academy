const express = require('express');
const router = express.Router();
const authRoutes = require('./auth'); 
const courseRoutes = require('./courses');
const userRoutes = require('./users');

router.use('/api/auth', authRoutes);
router.use('/courses', courseRoutes);
router.use('/users', userRoutes);

module.exports = router;