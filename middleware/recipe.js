const validator = require('validator');
const models = require('../config/models');
const imageScrape = require('../helpers/image-scrape');



//TODO: This is a mess atm, clean it up
const newRecipe = (req, res, next) => {
    imageScrape.findImage(req.body.url, (url)=>{
        let newRecipe = new models.Recipe({
            title: req.body.title,
            url: req.body.url,
            image: url,
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
    })

};

const findRecipes = (req, res, next) => {
    if(req.user == null){
        return next();
    }

    models.Recipe.find({ hasPinned: req.user._id  }).limit(10).exec((err, recipes)=>{

        if(err){
            console.log(err);
            return res.error('500');
            return next();
        } else if(!recipes){
            return next();
        }

        req.recipes = recipes;
        return next();
    });


};

const listRecipes = (req, res, next)=>{
    models.Recipe.find({hasPinned: {$ne: req.user._id}}).limit(10).exec((err, recipes)=> {
        if (!err) {
            req.recipes = recipes;
            return next();
        }
        req.error = error;
        return next();


    });
};

const pinRecipe = (req, res, next)=>{

    console.log(req.user._id);
    models.Recipe.findByIdAndUpdate(req.params.id, {$push: {hasPinned: req.user._id}}, (err, recipe)=>{
        console.log(recipe);
        if(!err){
            return next();
        }
    });
    return next();
};
module.exports = {
    newRecipe: newRecipe,
    findRecipes: findRecipes,
    listRecipes: listRecipes,
    pinRecipe: pinRecipe
};