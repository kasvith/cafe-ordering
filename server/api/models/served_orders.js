"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./order');
var Order = mongoose.model('Orders');

var ServedOrderSchema = new Schema({
    order: ['Order']
});

module.exports = mongoose.model('ServedOrders', ServedOrderSchema);