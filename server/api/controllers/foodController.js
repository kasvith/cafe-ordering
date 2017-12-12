'use strict';

var mongoose = require('mongoose'),
    FoodCategory = mongoose.model('FoodCategories'),
    Food = mongoose.model('Foods');

// food categories
exports.add_food_category = (req, res) => {
    var foodCategory = new FoodCategory(req.body);
    foodCategory.save((err, foodCat)=>{
        if (err || !foodCat) {
            console.log(err);
            res.status(403).json({
                error: true,
                message: 'Error creating category, category name exists',
            });
            return;
        }

        res.status(200).json({
            error: false,
            payload: foodCat,
        });
    });
}

exports.list_all_food_categories = (req, res) => {
    FoodCategory.find({}, (err, categories) => {
        if (err) {
            console.log(err);
            res.status(403).json({
                error: true,
                message: 'Error fetching data',
            });
            return;
        }

        res.status(200).json({
            error: false,
            payload: categories,
        });
    });
}

exports.update_food_category = (req, res) => {
    FoodCategory.findByIdAndUpdate(req.params.catID, {$set : req.body} , {new : true}, 
        (err, foodCat) => {
            if(err || !foodCat){
                console.log(err);
                res.status(403).json({
                    error: true,
                    message: 'Error creating category, category name exists',
                });
                return;
            }

            res.status(200).json({
                error: false,
                payload: foodCat,
            });
        }
    );
}

exports.remove_food_category = (req, res) => {
    // will remove all associated foods within this category also
    FoodCategory.findByIdAndRemove(req.params.catID, (err, cat) => {
        if(err || !cat){
            console.log(err);
            res.status(403).json({
                error: true,
                message: 'Error deleting category',
            });
            return;
        }

        Food.remove({category : cat._id}, (err, foods) => {
            if(err || !foods){
                console.log(err);
                res.status(403).json({
                    error: true,
                    message: 'Error deleting foods associated',
                });
                return;
            }
            
            res.status(200).json({
                error:false,
                message: 'Deletion successed',
            })
        });
    });
}

// end of categories

// start of foods
exports.add_food = (req, res) => {
    var food = new Food(req.body);
    food.save((err, food) => {
        if(err || !food){
            console.log(err);
            res.status(403).json({
                error: true,
                message: 'Error adding food',
            });
            return;
        }

        res.status(200).json({
            error: false,
            payload: {
                food: food
            }
        });
    });
}

exports.update_food = (req, res) => {
    Food.findByIdAndUpdate(req.params.foodID, {$set : req.body} , {new : true}, 
        (err, food) => {
            if(err || !food){
                console.log(err);
                res.json({
                    error: true,
                    message: 'Error updating food details',
                });
                return;
            }

            res.status(200).json({
                error: false,
                payload: food,
            });
        }
    );
}

exports.list_all_foods = (req, res) => {
    Food.find({})
        .populate('category')
        .exec((err, foods) => {
            if (err || !foods) {
                console.log(err);
                res.status(403).json({
                    error: true,
                    message: 'Error adding food',
                });
                return;
            }

            var result = {
                error: false,
                payload:{
                    foods: foods
                }
            }

            res.status(200).json(result);
        });
}

exports.list_foods_by_category = (req, res) => {
    Food.find({category:req.params.category})
        .populate('category')
        .exec((err, foods) => {
            if (err || !foods) {
                console.log(err);
                res.status(403).json({
                    error: true,
                    message: 'Error adding food',
                });
                return;
            }

            var result = {
                error: false,
                payload:{
                    foods: foods
                }
            }

            res.status(200).json(result);
        });
}

exports.list_all_foods_by_category = (req, res) => {
    Food.aggregate(
        [
            {"$sort" : {"name" : 1}},
            {"$group" : {_id : "$category", "foods" : {"$push" : "$$ROOT"}}}
        ], 
        (err, foods) => {
            if (err || !foods) {
                console.log(err);
                res.status(403).json({
                    error: true,
                    message: 'Error fetching food',
                });
                return;
            }

            var result = {
                error: false,
                payload:{
                    foods: foods
                }
            }

            res.status(200).json(result);
        }
    );
}
// end of foods