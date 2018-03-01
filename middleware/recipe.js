const validator = require('validator');
const models = require('../config/models');
const imageScrape = require('../helpers/image-scrape');



//TODO: This is a mess atm, clean it up
const newRecipe = (req, res, next) => {
    //Scrapes image, uploads to CDN
    imageScrape.findImage(req.body.url, (result, tags)=>{
        if(tags){
            req.body.tags = tags;
        }
        let newRecipe = new models.Recipe({
            title: req.body.title,
            url: req.body.url,
            image: result.url,
            hasPinned: req.user._id,
            tags: req.body.tags,
            description: req.body.description,
            pinNumber: 1
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
//TODO: change this up some to sort by date pinned
const findRecipes = (req, res, next) => {
    if(req.user == null){
        return next();
    }

    models.Recipe.find({ hasPinned: req.user._id  }).sort({date: 'desc'}).limit(20).exec((err, recipes)=>{

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
    models.Recipe.find({hasPinned: {$ne: req.user._id}}).limit(20).exec((err, recipes)=> {
        if (!err) {
            req.recipes = recipes;
            return next();
        }
        req.error = error;
        return next();


    });
};

const pinRecipe = (req, res, next)=>{

    models.Recipe.findByIdAndUpdate(req.params.id, {"$push": {"hasPinned": req.user._id}, "$inc": {"pinNumber": 1}}, (err, recipe)=>{
        console.log(recipe);
        if(!err){
            models.User.findByIdAndUpdate(req.user._id, {$push: {recipes: {recipe: req.params.id, date: Date.now()}}}, (err, recipe) => {
                if(!err){
                    return next();
                }
            });

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