// Module requires

var http = require('http');
var express = require('express');
var expressWinston = require('express-winston');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var colors = require('colors');
var compression = require('compression');
var cors = require('cors');
var express_jwt = require('express-jwt');

// Config require, models init and routes require

var config = require('./server/config');
require('./server/models').init();
var routers = require('./server/routers');


// Database connection

mongoose.connect(config.DB_URI, function(error, connected) {
    if (error) { console.error(error.red); process.exit(1); }
    else console.log("Successfully connected to database".green);
});


// Routing and middleware definitions

var app = express();

// Middleware

// Log requests
app.use(expressWinston.logger(config.WINSTON_LOGGER_OPTS));

// Response compression
app.use(compression());

// Cross-origin resource sharing
app.use(cors());

// Body parsing
app.use(bodyParser.json());

// The following files will require authentication
app.get('/views/partials/auth_protected/*', express_jwt({ secret: config.JWT_SECRET }));

// Static files over HTTP
app.use(express.static(__dirname + '/client'));

// Routes
app.use('/users', routers.users);
app.use('/authenticate', routers.authenticate);

// The other gets will serve the webpage
app.get('*', function(req, res) { res.sendFile(__dirname + '/client/views/index.html'); })

// 404
app.all('*', function(req, res) { res.status(404).send("Not found"); });


http.createServer(app).listen(config.PORT);