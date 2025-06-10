// 1. IMPORT ALL MODULES FIRST
const express = require('express');
const path = require('path');
const createError = require('http-errors');
const connectDB = require('./config/db');

// 2. INITIALIZE EXPRESS APP IMMEDIATELY
const app = express();

// 3. VIEW ENGINE SETUP
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 4. MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 5. DATABASE CONNECTION
connectDB();

// 6. ROUTE IMPORTS
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminroutes');
const apiRoutes = require('./routes'); // Main API routes

// 7. FRONTEND PAGE ROUTES
app.get(['/', '/home'], (req, res) => res.render('home'));
app.get('/aboutUs', (req, res) => res.render('aboutUs'));
app.get('/courses', (req, res) => res.render('courses'));
app.get('/contactUs', (req, res) => res.render('contactUs'));
app.get('/signlog', (req, res) => res.render('signlog'));
app.get('/backend', (req, res) => res.render('backend'));
app.get('/frontend', (req, res) => res.render('frontend'));
app.get('/mobile', (req, res) => res.render('mobile'));
app.get('/problemsolving', (req, res) => res.render('problemsolving'));
app.get('/oop', (req, res) => res.render('oop'));
app.get('/datastruct', (req, res) => res.render('datastruct'));
app.get('/introcyber', (req, res) => res.render('introcyber'));
app.get('/cyberspec', (req, res) => res.render('cyberspec'));
app.get('/cehacker', (req, res) => res.render('cehacker'));

// 8. API ROUTES
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);

// 9. PRODUCTION CONFIGURATION
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// 10. ERROR HANDLERS
const routeNotFound = require('./middlewares/routeNotFound');
const errorHandler = require('./middlewares/errorHandler');
app.use(routeNotFound);
app.use(errorHandler);

// 11. START SERVER
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

module.exports = app;