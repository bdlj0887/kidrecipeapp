require('dotenv').config();
const models = require('../config/models');
const auth = require('./auth');


const loadUserFromSession = (req, res, next) => {
    if (!(req.session && req.session.userId)) {
        res.locals.user = null;
        return next();
    }
    models.User.findById(req.session.userId, (err, user) => {
        if(err){
            return next(err);
        }

        if(!user){
            res.locals.user = null;
            return next();
        }

        user.password = null;
        req.user = user;
        res.locals.user = user;
        next();

    });

}

const loginRequired = (req, res, next) => {
    if (req.user) {
        return next();
    }

    res.redirect('/login');
}

//TODO: Implement authorization middleware.

module.exports = {
    loadUserFromSession: loadUserFromSession,
    loginRequired: loginRequired
}