const validator = require('validator');


//TODO: figure out how to push all the invalid options to locals and render properly, this seems like frustrating ux
//TODO: Add client side validation to disable submit??
const registerValidate = (req, res, next) => {
    if(!validator.isEmail(req.body.email)){
        res.locals.error = 'Invalid Email';
        return next();
    } else if(!validator.isLength(req.body.username, {min: 3, max: 12} || !validator.isAlphanumeric(req.body.username))){
        req.locals.error = 'Invalid Username - Only alphanumeric ';
    } else if(!validator.isLength(req.body.password, {min: 6, max: 40})){
        req.locals.error = 'Invalid Password. Please enter a password between 6 and 40 characters.'
    }
};


module.exports = {
    registerValidate: registerValidate
}