'use strict';

var express = require('express');
var router  = express.Router();
var userController = require('../controllers/userController');
var passport = require('passport');

router.get('/' , passport.authenticate('jwt', {session : false, failureRedirect: '/api/unauthorized'}) ,userController.list_all_users);
router.get('/:role', userController.list_users_by_role);
router.delete('/:userID', userController.delete_user);
router.post('/',userController.register_user);
router.put('/:userID', userController.update_user);
router.post('/login', userController.user_login);

module.exports = router;