require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const createError = require('http-errors');

const User = require('./models/User');

const connectDB = require('./config/db');
const contactRoutes = require('./routes/contact'); // غيّر الاسم حسب ملفك
const authRoutes = require('./routes/auth');
const {isAdmin} = require('./middlewares/authMiddleware');
const cookieParser = require('cookie-parser');




// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coursesDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/upload', express.static('upload'));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// Static Files
app.use(express.static(path.join(__dirname, 'public')));





app.use(cookieParser());

// Frontend Page Routes
const pageRoutes = [
    { path: ['/', '/home'], view: 'home' },
    { path: '/aboutUs', view: 'aboutUs' },
    { path: '/courses', view: 'courses' },
    { path: '/contactUs', view: 'contactUs' },
    { path: '/signlog', view: 'signlog' },
    { path: '/backend', view: 'backend' },
    { path: '/frontend', view: 'frontend' },
    { path: '/mobile', view: 'mobile' },
    { path: '/problemsolving', view: 'problemsolving' },
    { path: '/oop', view: 'oop' },
    { path: '/datastruct', view: 'datastruct' },
    { path: '/introcyber', view: 'introcyber' },
    { path: '/cyberspec', view: 'cyberspec' },
    { path: '/cehacker', view: 'cehacker' }
];


pageRoutes.forEach(route => {
    app.get(route.path, (req, res) => res.render(route.view, { user: req.user }));
});

app.get('/dashboard', isAdmin, (req, res) => {
  res.render('dashboard');
});




// API Routes
app.use('/api', require('./routes'));
app.use('/api/auth', require('./routes/auth'));
app.use('/auth', authRoutes);
app.use('/api/courses', require('./routes/courses'));
const courseRoutes = require('./routes/courses');
app.use('/', require('./routes/contact'));
app.use('/upload', require('./routes/upload'));
app.use('/courses', courseRoutes);



// Production Build (Optional for React frontend)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

// Error Handling Middlewares
app.use(require('./middlewares/routeNotFound'));
app.use(require('./middlewares/errorHandler'));

// Start Server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});