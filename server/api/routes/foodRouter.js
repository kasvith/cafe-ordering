'use strict';

var express = require('express');
var router  = express.Router();
var foodController = require('../controllers/foodController');

// categories
router.post('/category', foodController.add_food_category);
router.get('/category', foodController.list_all_food_categories);
router.put('/category/:catID', foodController.update_food_category);
router.delete('/category/:catID', foodController.remove_food_category);

// foods
router.get('/', foodController.list_all_foods);
router.post('/', foodController.add_food);
router.put('/:foodID', foodController.update_food);
router.get('/:category', foodController.list_foods_by_category);
router.get('/all/category', foodController.list_all_foods_by_category);

module.exports = router;
