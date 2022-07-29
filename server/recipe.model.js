const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    s3Key: String
    // fieldname: String,
    // originalname: String,
    // encoding: String,
    // mimetype: String,
    // destination: String,
    // filename: String,
    // path: String,
    // size: Number
});

const stepSchema = new mongoose.Schema({
    stepId: {
        type: Number,
        min: 1,
        required: true
    },
    stepTitle: String,
    stepDescription: String,
    stepImages:[imageSchema]
});

const ingredientSchema = new mongoose.Schema({
    ingredientId: Number,
    ingredientName: String,
    ingredientAmount: String,
    ingredientUnit: String
});

const recipeSchema = new mongoose.Schema({
    recipeTitle: {
        type: String,
        required: [true, "No Name specified"]
    },
    recipeIngredients: [ingredientSchema],
    recipeAddedDate: Date,
    recipeDescripton: String,
    recipeIsVeg: {
        type: Boolean,
        required: [true, "specify if Veg or not"]
    },
    recipePrevImage: imageSchema,
    recipeCalories: Number,
    recipeRating:{
        type: Number,
        min: 1,
        max: 5
    },
    recipeTags: [String],
    recpiesteps: [stepSchema]
});

module.exports = mongoose.model('recipes', recipeSchema);