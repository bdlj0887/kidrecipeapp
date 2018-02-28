require('dotenv').config();
const express = require('express');
const models = require('../config/models');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const validators = require('../middleware/validators');
let router = express.Router();


//login routes
router.get("/login", (req, res) => {
    res.render("login", { title: 'Login', error: null });
});



router.post('/login', (req, res) => {
    console.log(req.body.username);
    console.log(req.body);
    models.User.findOne({ username: req.body.username }, (err, user) => {

        console.log(bcrypt.compareSync(req.body.password, user.password));
        if(!user || !bcrypt.compareSync(req.body.password, user.password)){
            return res.render('login', {
                error: 'Incorrect email or password.',
                title: 'Login',

            });
        }


        //creates session, add jwt?
        req.session.userId = user._id;
        res.redirect('/');
    })
})



//registration routes
router.get('/register', (req, res)=>{
    res.render('register', { title: 'Registration'});
});

router.post('/register', (req, res)=>{

    let hash = bcrypt.hashSync(req.body.password, 8);
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
        res.redirect('/');

    })
});


//logout route
router.post('/logout', (req, res) => {
    if(req.session) {
        req.session.reset();
        return res.redirect('/')
    }
    res.redirect('/');
});


//TODO: password reset, change, etc
//TODO: email only auth?
module.exports = router;