"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./food');
require('./customer');
require('./user');

// Sub documents
var Food = mongoose.model('Foods');
var Customer = mongoose.model('Customers');
var User = mongoose.model('Users');

var OrderSchema = new Schema({
    orderID:{
        type: Number
    },
    tableID:{
        type: Number,
        min: 0,
    },
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    payment_status:{
        type: String,
        enum: ['paid', 'unpaid'],
        default: 'unpaid',
    },
    order_status:{
        type: String,
        enum: ['pending', 'in_progress', 'finished', 'served'],
        default: 'pending'
    },
    chef:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    waiter:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    date:{
        type: Date,
        default: Date.now
    },
    price:{
        type: Number
    },
    foods:[
        {
            food:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Food"
            },
            quantity:{
                type: Number,
                min: 0
            }
        }
    ]
});

module.exports = mongoose.model('Orders', OrderSchema);
