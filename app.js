require('dotenv').config();
console.log('🌍 Loaded MONGODB_URI:', process.env.MONGODB_URI);
const express = require('express');
const mongoose = require('mongoose'); // ADD MISSING IMPORT
const app = express();
const connectDB = require('./config/db');
const path = require('path');
const createError = require('http-errors');

console.log('🔍 MONGODB_URI =', process.env.MONGODB_URI);


// Connect to MongoDB - CHOOSE ONE APPROACH BELOW

// OPTION 1: Use your existing connectDB function (recommended)
connectDB();

// OPTION 2: Direct connection (remove connectDB if using this)
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('Connected to MongoDB Atlas'))
// .catch(err => console.error('Connection error:', err));

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Admin Routes
const adminRoutes = require('./routes/adminroutes');
app.use('/admin', adminRoutes);

// Production Build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api') || req.originalUrl.startsWith('/admin')) {
      return next();
    }
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.get('/', (req, res) => {
  res.send('✅ API is working!');
});


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