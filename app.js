require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require('path');
const createError = require('http-errors');

// Connect to MongoDB
connectDB();

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes (Fixed duplicates and optimized)
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Admin Routes
const adminRoutes = require('./routes/adminroutes');
app.use('/admin', adminRoutes);

// Production Build (Moved below API/admin routes)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  // Smart catch-all that ignores API/admin routes
  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api') || req.originalUrl.startsWith('/admin')) {
      return next(); // Skip to next middleware
    }
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// 404 Handler
const routeNotFound = require('./middlewares/routeNotFound');
app.use(routeNotFound);

// Global Error Handler
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

module.exports = app;