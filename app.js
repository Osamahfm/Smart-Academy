require('dotenv').config();
const express = require('express');
const path = require('path');
const createError = require('http-errors');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contact'); // غيّر الاسم حسب ملفك


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Frontend Page Routes
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


// API Routes
app.use('/api', require('./routes'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/', contactRoutes);


// Production Build (Optional for React frontend)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
const uploadRoute = require('./routes/upload');
app.use('/upload', uploadRoute);

app.use('/upload', express.static('upload'));


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
