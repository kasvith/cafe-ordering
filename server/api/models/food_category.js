"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FoodCategorySchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('FoodCategories', FoodCategorySchema);
