const jwt = require('jsonwebtoken');
const User = require('../models/User');

const attachUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.locals.user = null;
      return next();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    res.locals.user = user || null;
    next();
  } catch (error) {
    console.error('attachUser middleware error:', error);
    res.locals.user = null;
    next();
  }
};

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

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).render('error', { message: 'Admin access required' });
  }
};

module.exports = { attachUser, protect, isAdmin };
