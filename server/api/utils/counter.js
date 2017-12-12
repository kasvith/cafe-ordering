'use strict';

var mongoose = require('mongoose'),
    Counter = mongoose.model('Counter'),
    async = require('async');

exports.getNextCount = function (id, callback) {
    Counter.findOneAndUpdate({name: id}, {$inc: {value: 1}}, {new: true},
        (err, doc) => {
            if (err) {
                console.log(err);
                return;
            }

            callback(doc.value);
        }
    );
}