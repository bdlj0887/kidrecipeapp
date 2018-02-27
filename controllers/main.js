const express = require('express');
const auth = require('../middleware/auth');
const recipe = require('../middleware/recipe');
const locals = require('../config/locals');
let router = express.Router();

router.get('/', recipe.findRecipes, (req, res)=>{
    if(!req.user){
        return res.render('index', {title: 'Recipe App'});
    }

    res.render('dashboard', {title: 'Recipe App', recipes: req.recipes});

});

router.get('/recipes/new', auth.loginRequired, (req, res) => {
    res.render('newrecipe', {title: 'Add New Recipe'})
});

router.post('/recipes/new', auth.loginRequired, recipe.newRecipe,  (req, res) => {
    res.redirect('/');
});

router.get('/recipes/browse', auth.loginRequired, recipe.listRecipes, (req, res)=>{
   if(!req.error){
       res.render('recipes', { title: 'Recipe Browser', recipes: req.recipes });
   }
   res.redirect('/')

});

module.exports = router;