const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes (authenticate user)
const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).render('error', { message: 'Not authorized: No token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).render('error', { message: 'Not authorized: User not found' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).render('error', { message: 'Not authorized: Invalid token' });
  }
};

// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(403).render('error', { message: 'Admin access required' });
};

module.exports = { protect, isAdmin };
