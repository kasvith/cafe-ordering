'use strict';

var mongoose = require('mongoose'),
    Customer = mongoose.model('Customers'),
    Order    = mongoose.model('Orders'),
    ServedOrder = mongoose.model('ServedOrders'),
    Food = mongoose.model('Foods'),
    User = mongoose.model('Users'),
    Counter = require('../utils/counter'),
    async = require('async');

// places an order
exports.place_order = (req, res) => {
    async.waterfall([
        (callback) => {
            Counter.getNextCount("orders", (val)=>{
                req.body.order.orderID = orderID;
                callback(null);
            });
        },
        (callback) =>{
            update_customer(req.body.customer.telephone, callback);
        }
    ], (err, result) => {
        res.json({result, err});
    }
    );

    
}

function update_customer(telephone, callback){
    Customer.findOneAndUpdate({telephone:telephone}, {$inc: {visits: 1}}, {new: true}, (err, customer)=>{
        if(err){
            callback(err, null);
            return;
        }

        if(!customer){

        }
    })
       
}

function get_customer(req, res ,save_order_callback){
    Customer.findOneAndUpdate({telephone: req.body.customer.telephone},  
        (err, cust) =>{
            if(err){
                console.log(err);
                res.status(403).json({
                    error: true,
                    message: 'Error updating customer',
                });
                return;
            }

            if(!cust){
                var c = new Customer(req.body.customer);
                c.save((err, cus) => {
                    if (err || !cus) {
                        console.log(err);
                        res.status(403).json({
                            error: true,
                            message: 'Error creating customer',
                        });
                        return;
                    }

                    req.body.order.customer = cus._id;
                    save_order_callback(res, req.body.order);
                });
            }else{
                req.body.order.customer = cust._id;
                save_order_callback(res, req.body.order);
            }
        }
    );
}

function save_order(res ,order_details){
    var order = new Order(order_details);
    order.save((err, order) => {
        if (err || !order) {
            console.log(err);
            res.status(403).json({
                error: true,
                message: 'Error creating order',
            });
            return;
        }

        res.status(200).json({
            error: false,
            payload: {
                order: order
            }
        })
    });
}
//end placing an order

exports.change_order_status = (req, res) => {
    var status = req.params.status;
    var orderID = req.params.orderID;

    Order.findByIdAndUpdate(orderID, {$set : { order_status : status }}, {new : true}, (err, order) => {
        if(!err && !order){
            console.log(err);
            res.status(403).json({
                error: true,
                message: 'Error updating order',
            });
            return;
        }

        if(status === 'served'){
            var served = new ServedOrder(order);
            served.save((err, saved) => {
                if(err || !saved){
                    console.log(err);
                    res.status(403).json({
                        error: true,
                        message: 'Error updating order',
                    });
                    return;
                }

                Order.findByIdAndRemove(order._id, (err, doc) => {
                    if(err || !doc){
                        console.log(err);
                        res.status(403).json({
                            error: true,
                            message: 'Error updating order',
                        });
                        return;
                    }

                    res.status(200).json({
                        error: false,
                        message: "Updated successfully",
                        payload: {
                            order : order
                        }
                    });
                });
            });
        }else{
            res.status(200).json({
                error: false,
                message: "Updated successfully",
                payload: {
                    order : order
                }
            });
        }
    });
}

exports.list_orders_by_status = (req, res) => {

}