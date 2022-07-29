const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
require('dotenv').config();
const { uploadFile, getFile } = require("./S3")

const PORT = process.env.PORT || "5000";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const mimeType = file.mimetype;
        const fileType =  mimeType.split('/')
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileType[1])
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if(allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 15728640 } })

let Recipe = require('./recipe.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin-Jay:test123@cluster0.fofzz18.mongodb.net/recipeDB');
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.get('/', function(req, res) {
    Recipe.find({}, function(err, results) {
        if(err) {
            res.send(err);
        } else {
            res.send(results);
        }
    });
});

app.get('/search/:searchQuery', function(req, res) {
    const searchQuery = req.params.searchQuery;

    console.log(searchQuery);

    Recipe.find({recipeTitle: {$regex: searchQuery, $options: "$i"}}, function(err, results) {
        if(err) {
            res.send(err);
        } else {
            res.send(results);
        }
    });
});

app.get('/:recipeName', function(req, res) {
    const recipeName = req.params.recipeName;

    Recipe.findOne({ recipeTitle: recipeName}, function(err, result) {
        if(err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/images/:s3Key', function(req, res) {
    const s3Key = req.params.s3Key;

    console.log(s3Key);

    const promise = getFile(s3Key);

    promise.then(function(url) {
        res.send(url)
    }, function(err) { console.log(err) });
});

app.post('/recipes/addNew', upload.single('recipePrevImage'), async (req, res) => {
    const recipeTitle = req.body.recipeTitle;
    const recipeIngredients = JSON.parse(req.body.recipeIngredients);
    const recipeDescripton = req.body.recipeDescripton;
    let recipeIsVeg = true;

    if (req.body.recipeIsVeg==='veg') {
        recipeIsVeg = true;
    } else if(req.body.recipeIsVeg==='nonveg') {
        recipeIsVeg = false;
    }

    const recipeTags = req.body.recipeTags.split(',');
    const recipePrevImage = req.file;

    const uploadedImage = await uploadFile(recipePrevImage);

    console.log(uploadedImage.key);
    // .catch((err) => res.status(400).json('Error:' + err));

    const recipeCalories = req.body.recipeCalories;
    const recpiesteps = JSON.parse(req.body.recpiesteps);

    const newrecipe = new Recipe({
        recipeTitle: recipeTitle,
        recipeIngredients: recipeIngredients,
        recipeDescripton: recipeDescripton,
        recipeCalories: recipeCalories,
        recipeIsVeg: recipeIsVeg,
        recipeTags: recipeTags,
        recipePrevImage: {
            s3Key: uploadedImage.key
        },
        recpiesteps: recpiesteps
    });

    console.log(newrecipe);

    console.log(newrecipe);

    newrecipe.save()
    .then(() => res.json("recipe Added"))
    .catch((err) => res.status(400).json('Error:' + err))
});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});