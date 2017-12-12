'use strict';

var express = require('express');
var router  = express.Router();
var orderController = require('../controllers/orderController');

router.post('/', orderController.place_order);
router.put('/status/:orderID/:status', orderController.change_order_status);

module.exports = router;