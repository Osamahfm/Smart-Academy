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

