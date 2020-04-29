const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    recipeId : {
        type: String
    },
    recipeTitle: {
        type: String
    }

}, { timestamps: true })


const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }