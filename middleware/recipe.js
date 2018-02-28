const validator = require('validator');
const models = require('../config/models');
const imageScrape = require('../helpers/image-scrape');



//TODO: This is a mess atm, clean it up
const newRecipe = (req, res, next) => {
    //Scrapes image, uploads to CDN
    imageScrape.findImage(req.body.url, (result)=>{
        let newRecipe = new models.Recipe({
            title: req.body.title,
            url: req.body.url,
            image: result.url,
            hasPinned: req.user._id,
            description: req.body.description
        });
        newRecipe.save((err, recipe)=>{
            if(err){
                console.log(err);
                return next();
            }
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
            return res.error(500);
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