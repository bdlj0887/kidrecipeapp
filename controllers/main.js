const express = require('express');
const auth = require('../middleware/auth');
const recipe = require('../middleware/recipe');
const locals = require('../config/locals');
let router = express.Router();

router.get('/', recipe.findRecipes, (req, res)=>{
    if(req.user){
        return res.render('dashboard', {title: 'Recipe App', recipes: req.recipes});
    } else {
        return res.render('index', {title: 'Recipe App'});
    }

});

router.get('/recipes/new', auth.loginRequired, (req, res) => {
    res.render('newrecipe', {title: 'Add New Recipe'})
});

router.post('/recipes/new', auth.loginRequired, recipe.newRecipe,  (req, res) => {
    res.redirect('/');
});

router.get('/recipes/browse', auth.loginRequired, recipe.listRecipes, (req, res)=>{
   if(!req.error){
       return res.render('recipes', { title: 'Recipe Browser', recipes: req.recipes });
   }
   res.redirect('/')

});
router.get('/recipe/pin/:id', auth.loginRequired, recipe.pinRecipe, (req, res)=> {
    res.redirect('/');
});

module.exports = router;