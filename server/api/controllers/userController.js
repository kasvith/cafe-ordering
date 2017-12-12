'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    bcrypt = require('bcrypt'),
    jwtOptions = require('../utils/jwtOptions'),
    jwt = require('jsonwebtoken');

exports.register_user = function (req, res) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    var usr = new User(req.body);
    usr.save((err, user) => {
        if (err || !user) {
            console.log(err);
            res.json({
                error: true,
                message: 'Error creating user, username exists',
            });
            return;
        }

        user.password = undefined;
        res.json({
            error: false,
            payload: {
                user:user
            },
        });
    });
}

exports.list_all_users = (req, res) => {
    User.find({})
        .select("name telephone username role")
        .exec((err, users) => {
            if (err) {
                console.log(err);
                res.json({
                    error: true,
                    message: 'Cannot fetch data'
                });
                return;
            }

            res.json({
                error: false,
                payload: {
                    users :users
                },
            });
        });
}

exports.list_users_by_role = (req, res) => {
    User.find({ role: req.params.role })
        .select("name telephone username role")
        .exec((err, users) => {
            if (err) {
                console.log(err);
                res.json({
                    error: true,
                    message: 'Cannot fetch data'
                });
                return;
            }

            res.json({
                error: false,
                payload: {
                    users :users
                },
            });
        });
}

exports.delete_user = (req, res) => {
    User.remove({
        _id: req.params.userID
    }, (err, usr) => {
        if (err) {
            console.log(err);
            res.json({
                error: true,
                message: 'Cannot delete user'
            });
            return;
        }

        res.json({
            error: false,
            message: "Deletion successfull"
        })
    });
}

exports.update_user = (req, res) => {
    if(req.body.password !== undefined){
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    User.findByIdAndUpdate(req.params.userID, { $set: req.body }, { new: true },
        (err, user) => {
            if (err) {
                console.log(err);
                res.json({
                    error: true,
                    message: 'Cannot delete user'
                });
                return;
            }

            user.password = undefined; // we do not send password again
            res.json({
                error: false,
                payload: {
                    user: user
                },
            });
        }
    );
}

exports.user_login = (req, res) => {
    if(req.body.username == undefined && req.body.password == undefined){
        res.status(401).json({
            error:true,
            message: "Username & Password must be provided"
        });
    }

    var username = req.body.username,
        password = req.body.password;

    // look for the username existance
    User.findOne({username: req.body.username}, (err, user) => {
        if(err || !user){
            res.status(401).json({
                error: true,
                message: 'User does not exists'
            });

            return;
        }

        if(!bcrypt.compareSync(password, user.password)){
            res.status(401).json({
                error: true,
                message: 'Password not matched'
            });

            return;
        }

        user.password = undefined;
        var jwtPayload = {
            _id: user._id,
            role: user.role,
        }
        var token = jwt.sign(jwtPayload, jwtOptions.secretOrKey);
        var payload = {
            user: user,
            token: token
        };

        res.status(200).json({
            error: false,
            payload: payload
        });
    });
}
