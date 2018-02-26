const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    username: String,
    profile: {

        //Add profile info here...
    },
    recipes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recipes'}]
});

let recipeSchema = new mongoose.Schema({
    title: String,
    image: String,
    info: {
        time: String,
        difficulty: Number,
        vegetarian: Boolean,
        vegan: Boolean
    },
    ingredients: [{
        name: String,
        unit: String,
        measurement: Number
    }],
    //Instructions
    body: String,
    comments: {
        body: String,
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'}
    }
});

let models = {
    User: mongoose.model('Users', userSchema),
    Recipes: mongoose.model('Recipes', recipeSchema)
};

module.exports = {
    User: models.User,
    Recipe: models.Recipes
};