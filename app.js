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

app.listen(5050, () => {
    console.log("Server is running on port 5050");
})

