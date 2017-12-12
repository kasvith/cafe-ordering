'use strict';

var mongoose = require('mongoose'),
    Customer = mongoose.model('Customers');

exports.add_customer = (req, res) => {
    var cust = new Customer(req.body);
    cust.save((err, cus)=>{
        if (err || !cus) {
            console.log(err);
            res.status(401).json({
                error: true,
                message: 'Error creating customer, already exists',
            });
            return;
        }

        res.status(200).json({
            error: false,
            payload: {
                customer : cus
            },
        });
    });
}

exports.delete_customer = (req, res) => {
    Customer.findByIdAndRemove(req.params.custID, (err, cus) => {
        if (err || !cus) {
            console.log(err);
            res.status(401).json({
                error: true,
                message: 'Error deleting customer',
            });
            return;
        }

        res.status(200).json({
            error: false,
            message: 'Deletion successfull'
        });
    });
}

exports.update_customer = (req, res) => {
    Customer.findByIdAndUpdate(req.params.custID, {$set : req.body}, {new : true}, (err, cus) => {
        if (err || !cus) {
            console.log(err);
            res.status(401).json({
                error: true,
                message: 'Error updating customer',
            });
            return;
        }

        res.status(200).json({
            error: false,
            payload:{
                customer: cus
            }
        });
    });
}

exports.list_all_customers = (req, res) => {
    Customer.find({}, (err, custs) => {
        if (err) {
            console.log(err);
            res.status(401).json({
                error: true,
                message: 'Error fetching data',
            });
            return;
        }

        res.status(200).json({
            error: false,
            payload:{
                customers: custs
            }
        });
    })
}
