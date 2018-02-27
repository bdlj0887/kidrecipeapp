const validator = require('validator');
const models = require('../config/models');



//TODO: This is a mess atm, clean it up
const newRecipe = (req, res, next) => {

    let newRecipe = new models.Recipe({
        title: req.body.title,
        url: req.body.url,
        image: req.body.imageUrl,
        hasPinned: req.user._id
    });
    newRecipe.save((err, recipe)=>{
       if(err){
           console.log(err);
           return next();
       }
       console.log(recipe);
       return next();
       });
};

const findRecipes = (req, res, next) => {
    if(req.user){

        models.Recipe.find({ hasPinned: req.user._id  }).limit(10).exec((err, recipes)=>{

        if(err){
            console.log(err);
            return res.error('500');
            return next();
        } else if(!recipes){

            return next();
        }

        req.recipes = recipes;
        console.log(req.recipes);
        return next();
    })}

};

const listRecipes = (req, res, next)=>{
    models.Recipe.find().limit(10).exec((err, recipes)=> {
        if (!err) {
            req.recipes = recipes;
            return next();
        }
        req.error = error;
        return next();


    });
};
module.exports = {
    newRecipe: newRecipe,
    findRecipes: findRecipes,
    listRecipes: listRecipes
}