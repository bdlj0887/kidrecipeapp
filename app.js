require('dotenv').config();
const path = require('path');
const PORT = process.env.PORT || 3000;
//npm modules
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const sessions = require('client-sessions');
const autoIncrement = require('mongoose-auto-increment');
const favicon = require('express-favicon');
let app = express();

//app modules
const auth = require('./middleware/auth');
const models = require('./config/models');
const authRoutes = require('./controllers/auth');
const mainRoutes = require('./controllers/main');


//db connection
mongoose.connect(process.env.MLAB)
    .then(console.log('App Connected'));



//config and middleware
app.set('view engine', 'pug');

//static files
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/img', express.static(__dirname + '/public/img'));

//other middleware
app.use(sessions({
    cookieName: "session",
    secret: process.env.SESSION_SECRET,
    duration: 30 * 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 10,
    cookie: {
        httpOnly: true
    }
}));

app.use(bodyParser.urlencoded({ extended: false }));
//TODO: figure out how to use AJAX forms etc, this isnt right I think
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use(auth.loadUserFromSession);



//router config
app.use(authRoutes);
app.use(mainRoutes);



//server
app.listen(PORT, ()=>{
    console.log('Started on' + PORT);
});