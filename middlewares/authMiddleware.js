const jwt = require('jsonwebtoken');
const User = require('../models/User');

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

<<<<<<< HEAD
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).render('error', { message: 'Admin access required' });
  }
   if (req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: 'Access denied. Admins only.' });
=======
const isAdmin = async (req, res, next) => {
  await protect(req, res, async () => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).render('error', { message: 'Admin access required' });
    }
  });
>>>>>>> 387d417fdbda7d3727b12aab43fb731d11dd5f07
};

module.exports = { protect, isAdmin };
