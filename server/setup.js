// Default user is admin
// Password is admin

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var promise = require('promises');

var User = require('./api/models/user'),
    Customer = require('./api/models/customer'),
    Order = require('./api/models/order'),
    ServedOrder = require('./api/models/served_orders'),
    Food = require('./api/models/food'),
    FoodCategory = require('./api/models/food_category'),
    Counter = require('./api/models/counter'),
    bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/HotelManagementSystem',
    {
        useMongoClient: true
    },
    function (err) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
    }
);

mongoose.connection.once('open', () => {
    mongoose.connection.db.dropDatabase();
    console.log('Successfully connected to server');
    console.log('Database reset successfully');
    setup();

});

function setup() {
    mongoose.connect('mongodb://localhost/HotelManagementSystem',
        {
            useMongoClient: true
        },
        function (err) {
            if (err) {
                console.log(err);
                process.exit(1);
            }

            initializeSchemas();
        }
    );

}

function initializeSchemas(){
    var orderCounter = new Counter({
        name:'orders',
        value:0
    });

    orderCounter.save((err, counter)=>{
        if (err) {
            console.log(err);
            process.exit(3);
        }
    });

    var admin = new User({
        name: {
            first: "Admin",
            last: ""
        },
        telephone: '',
        username: 'admin',
        password: bcrypt.hashSync('admin', 10),
        role: 'admin'
    });

    admin.save(function (err, admin) {
        if (err) {
            console.log(err);
            process.exit(3);
        }
    });
}
