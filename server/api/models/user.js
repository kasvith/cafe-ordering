"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name:{
        first: String,
        last: String,
    },
    telephone:{
        type: String
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String
    },
    role:{
        type:[{
            type: String,
            enum: ['admin', 'waiter', 'chef']
        }],
        default: ['waiter']  
    }
});

module.exports = mongoose.model('Users', UserSchema);
