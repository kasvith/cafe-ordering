'use strict';

var express = require('express');
var router  = express.Router();
var customerController = require('../controllers/customerController');

router.get('/', customerController.list_all_customers);
router.post('/', customerController.add_customer);
router.put('/:custID', customerController.update_customer);
router.delete('/:custID', customerController.delete_customer);

module.exports = router;