const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    username: String,
    recipes: [
        {recipe: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipes'},
        date: {type: Date, default: Date.now}}]
});

let recipeSchema = new mongoose.Schema({
    title: String,
    image: String,
    url: String,
    description: String,
    tags: [{ type: String }],
    date: { type: Date, default: Date.now },
    hasPinned: [{type: mongoose.Schema.Types.ObjectId, ref: 'Users'}],
    pinNumber: Number
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