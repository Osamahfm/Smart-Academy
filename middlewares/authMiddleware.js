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

const isAdmin = async (req, res, next) => {
  await protect(req, res, async () => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).render('error', { message: 'Admin access required' });
    }
  });
};

module.exports = { protect, isAdmin };
