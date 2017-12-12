"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FoodSchema = new Schema({
    name: {
        type:String,
        unique: true,
    },
    price: {
        type: Number
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodCategories'
    },
});

module.exports = mongoose.model('Foods', FoodSchema);