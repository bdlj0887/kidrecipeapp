require('dotenv').config();
const express = require('express');
const models = require('../config/models');
const bcrypt = require('bcryptjs');
const auth = require('../config/auth');

let router = express.Router();


//login routes
router.get("/login", (req, res) => {
    res.render("login", { title: 'Login', error: null });
});



router.post('/login', (req, res) => {
    console.log(req.body.email);
    models.User.findOne({ email: req.body.email }, (err, user) => {
        if(!user || bcrypt.compareSync(req.body.password, user.password)){
            return res.render('login', {
                error: 'Incorrect email or password.',
                title: 'Login',

            });
        }


        //creates session, add jwt?
        req.session.userId = user._id;
        res.redirect('/dashboard');
    })
})



//registration routes
router.get('/register', (req, res)=>{
    res.render('register', { title: 'Registration'});
});

router.post('/register', registerValidate, (req, res)=>{
    if(req.error){
        res.render('register', { title: 'Registration' })
    }
    let hash = bcrypt.hashSync(req.body.password, 12);
    req.body.password = hash;

    //TODO: fix this
    let newUser = new models.User({
        username: req.body.username,
        email: req.body.email,
        password: hash
    });

    newUser.save((err, user)=>{
        console.log(user);
        //handling some errors
        if(err){
            //
            let error = err.code
            if(err.code === 11000){
                error = 'Email already registered';
            }
            res.redirect('register');
        }
        //create session, redirect to dash
        req.session.userId = user._id;
        res.redirect('/dashboard');

    })
});


//logout route
router.post('/logout', (req, res) => {
    if(req.session) {
        req.session.reset();
    }
    res.redirect('/');
});


//TODO: password reset, change, etc
//TODO: email only auth?
module.exports = router;