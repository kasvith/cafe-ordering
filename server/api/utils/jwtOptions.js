'use strict';

var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'nicecafeserversecret';

module.exports = jwtOptions;