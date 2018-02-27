const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    username: String,
    recipes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recipes'}]
});

let recipeSchema = new mongoose.Schema({
    title: String,
    image: String,
    url: String,
    hasPinned: [{type: mongoose.Schema.Types.ObjectId, ref: 'Users'}]
    //TODO: Implement crawling and parsing - this is the primary project

});

let models = {
    User: mongoose.model('Users', userSchema),
    Recipes: mongoose.model('Recipes', recipeSchema)
};

module.exports = {
    User: models.User,
    Recipe: models.Recipes
};