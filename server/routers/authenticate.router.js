var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

var config = require('../config');

var router = module.exports = express.Router();

var User = mongoose.model('User');

router.post('/', function(req, res) {
    var mail = req.body.mail;
    var password = req.body.password;

    User.findOne({ mail: mail }, function(err, user) {
        if (err) res.status(500).send(err);
        if (!user) res.status(401).send('User not found');
        else {
            bcrypt.compare(password, user.password, function(err, equal) {
                if (equal) {
                    var token = jwt.sign(user.toObject(), config.JWT_SECRET, {
                        expiresIn: 3600
                    });
                    res.json({
                        token: token
                    });
                }
                else {
                    res.status(401).send('Incorrect password');
                }
            });
        }
    });
    
});

router.all('*', function(req, res) {
    res.status(404).send('Not found');
});