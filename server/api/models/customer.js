'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerScheme = new Schema({
    name:{
        first: String,
        last: String,
    },
    telephone:{
        type: String,
        required: true,
        unique: true
    },
    visits:{
        type: Number,
        min: 1,
        default: 1
    } 
});

module.exports = mongoose.model('Customers', CustomerScheme);
