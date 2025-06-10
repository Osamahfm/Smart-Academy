const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get(['/', '/home'], (req, res) => {
    res.render('home');
})

app.get('/aboutUs', (req, res) => {
    res.render('aboutUs');   
})

app.get('/courses', (req, res) => {
    res.render('courses');
});

app.get('/contactUs', (req, res) => {
    res.render('contactUs'); 
})

app.get('/signlog', (req, res) => {
    res.render('signlog');
})

app.get('/backend', (req, res) => {
    res.render('backend');
})

app.get('/frontend', (req, res) => {
    res.render('frontend');
})

app.get('/mobile', (req, res) => {
    res.render('mobile');
})

app.get('/problemsolving', (req, res) => {
    res.render('problemsolving');
})

app.get('/oop', (req, res) => {
    res.render('oop');
})

app.get('/datastruct', (req, res) => {
    res.render('datastruct');
})

app.get('/introcyber', (req, res) => {
    res.render('introcyber');
})

app.get('/cyberspec', (req, res) => {
    res.render('cyberspec');
})

app.get('/cehacker', (req, res) => {
    res.render('cehacker');
})

app.listen(5050, () => {
    console.log("Server is running on port 5050");
})

//youssefmorad "route and error handling part"
// app.js
const express = require('express');
const createError = require('http-errors');
const path = require('path');

// Import routes
const mainRouter = require('./routes');


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api', mainRouter);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// 404 handler
app.use((req, res, next) => {
  next(createError(404, 'Not Found'));
});

// Error handler
app.use(require('./middlewares/errorHandler'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;