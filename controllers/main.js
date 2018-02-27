const express = require('express');
const auth = require('../middleware/auth');
const locals = require('../config/locals');
let router = express.Router();

router.get('/', (req, res)=>{
    if(!req.user){
        return res.render('index', {title: 'Recipe App'});
    }
    res.render('dashboard', {title: 'Recipe App'});

});

router.get('/dashboard', auth.loginRequired, (req, res) => {
    res.render('Dashboard', {title: locals.Dashboard.title});
});
module.exports = router;