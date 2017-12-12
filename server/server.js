// load all modules
var express = require('express'),
	app = express(),
	port = process.env.PORT || 3223,
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	router = express.Router(),
	jwt = require('jsonwebtoken'),
	passport = require("passport"),
	passportJWT = require("passport-jwt"),
	ExtractJwt = passportJWT.ExtractJwt,
	JwtStrategy = passportJWT.Strategy,
	jwtOptions = require('./api/utils/jwtOptions');

// load models	
var user = require('./api/models/user'),
	foodCategory = require('./api/models/food_category'),
	food = require('./api/models/food'),
	customer = require('./api/models/customer'),
	order = require('./api/models/order'),
	counter = require('./api/models/counter'),
	served_orders = require('./api/models/served_orders');

// Schemas
var User = mongoose.model('Users');

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
	User.findById(jwt_payload._id, (err, user) => {
		if(err)
			next(err, false);
		
		next(null, user);
	});
});
passport.use(strategy);
app.use(passport.initialize());

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/HotelManagementSystem', {
	useMongoClient: true,
});

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(router);

// router endpoints
router.use('/api/orders', require('./api/routes/orderRouter'));
router.use('/api/customers', require('./api/routes/customerRouter'));
router.use('/api/foods', require('./api/routes/foodRouter'));
router.use('/api/users', require('./api/routes/userRouter'));
router.get('/api/unauthorized', (req, res) => {
	res.status(401).json({
		error: true,
		message: "Unauthorized access"
	});
});

app.use(function (req, res) {
	res.status(404).send({
		message: req.originalUrl + ' not found',
		error: true
	})
});

app.listen(port, () => {
	console.log('Hotel Management System Server started at http://127.0.0.1:' + port + "\n" +
		"Press Ctrl + C to stop the server\n");
});