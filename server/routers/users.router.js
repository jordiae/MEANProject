var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var express_jwt = require('express-jwt');
var config = require('../config');

var router = module.exports = express.Router();

var User = mongoose.model('User');

// Sign up
router.post('/', function(req, res) {
    // Check whether mail (username) and password fields are vacant
    if (!req.body.mail || !req.body.password) {
        res.status(500).send("You must specify a valid mail adress and password");
        return;
    }

    // Encryption
    bcrypt.hash(req.body.password, 12, function(err, hashedPassword) {
        if (err) res.status(500).json(err);
        else {
            /// The new user is saved in the db
            req.body.password = hashedPassword;
            var user_instance = new User(req.body);

            user_instance.save(function(err, saved_user) {
                if (err) res.status(500).json(err);
                else {
                    // We don't want to return de password to the client.
                    // This is the reason why we need toObject and delete,
                    // because saved_user is not a Javascript object, but
                    // an instance of User (model)
                    delete saved_user.password;
                    // We send the saved document
                    res.status(200).json(saved_user);
                }
            });
        }
    }); 
});



// The following http requests will require authentication

router.use(express_jwt({ secret: config.JWT_SECRET, requestProperty: 'user' }));

// Get an user
router.get('/', function(req, res) {
    User.findOne({ mail: req.user.mail }, function(err, user) {
        if (err) res.status(500).json(err);
        else res.status(200).json(user);
    });
});

/* The following code is the server side implementation of agendas and their contacts. Since it's not implemented in the frontend, it is commented out
// Create new agenda
router.post('/agendas', function(req, res) {
    var agenda = req.body;

    var query = { mail: req.user.mail };
    var update = { $push: { agendas: agenda } };
    
    // required if we want the callback to return the updated object
    var options = { 'new': true };

    User.findOneAndUpdate(query, update, options, function(err, updated) {
        if (err) res.status(500).json(err);
        else res.status(200).json(updated);
    });
});

// Edit an agenda
router.patch('/agendas/:id', function(req, res) {
    var query = { mail: req.user.mail, "agendas._id": req.params.id };
    
    var updateObj = {};
    for (var property in req.body)
        if (req.body.hasOwnProperty(property))
            updateObj["agendas.$." + property] = req.body[property];

    var update = { $set: updateObj };

    var options = { 'new': true };
    
    console.log(query);
    console.log(update);

    User.findOneAndUpdate(query, update, options, function(err, updated) {
        console.log(err);
        if (err) res.status(500).json(err);
        else res.status(200).json(updated);
    });
});

// Remove an agenda
router.delete('/agendas/:id', function(req, res) {
    var query = { mail: req.user.mail };

    var update = { $pull: { agendas: { _id: req.params.id } } };

    var options = { 'new': true };
    
    User.findOneAndUpdate(query, update, options, function(err, updated) {
        if (err) res.status(500).json(err);
        else res.status(200).json(updated);
    });
});



// Create new contact
router.post('/agendas/:id/contacts', function(req, res) {

   var contact = req.body;

    var query = { mail: req.user.mail, "agendas._id": req.params.id };

    var update = { $push: { "agendas.$.contacts": contact } };

    var options = { 'new': true };
    
    console.log(query);
    console.log(update);

    User.findOneAndUpdate(query, update, options, function(err, updated) {
        console.log(err);
        if (err) res.status(500).json(err);
        else res.status(200).json(updated);
    });
});

// Edit a contact
router.patch('/agendas/:id/contacts/:contactNumber', function(req, res) {
    var query = { mail: req.user.mail, "agendas._id": req.params.id};

    // TODO: contactNumber -> id http://stackoverflow.com/questions/12612581/update-an-element-in-sub-of-sub-array-in-mongodb
    // http://stackoverflow.com/questions/17769714/how-to-loop-through-an-array-in-mongodb

    var updateObj = {};
    for (var property in req.body)
        if (req.body.hasOwnProperty(property))
            updateObj["agendas.$.contacts." + req.params.contactNumber + "." + property] = req.body[property];


    var update = { $set: updateObj };

    var options = { 'new': true };
    
    console.log(query);
    console.log(update);

    User.findOneAndUpdate(query, update, options, function(err, updated) {
        console.log(err);
        if (err) res.status(500).json(err);
        else res.status(200).json(updated);
    });
});

// Remove a contact
router.delete('/agendas/:agendaId/contacts/:contactId', function(req, res) {


    var query = { mail: req.user.mail, "agendas._id": req.params.agendaId };

    var update = { $pull: { "agendas.$.contacts": { _id: req.params.contactId } } };


    var options = { 'new': true };
    
    console.log(query);
    console.log(update);

    User.findOneAndUpdate(query, update, options, function(err, updated) {
        console.log(err);
        if (err) res.status(500).json(err);
        else res.status(200).json(updated);
    });
});
*/


// Create new contact
router.post('/contacts', function(req, res) {
    var contact = req.body;

    var query = { mail: req.user.mail };
    var update = { $push: { contacts: contact } };
    
    var options = { 'new': true };

    User.findOneAndUpdate(query, update, options, function(err, updated) {
        if (err) res.status(500).json(err);
        else res.status(200).json(updated);
    });
});

// Edit a contact
router.patch('/contacts/:id', function(req, res) {
    var query = { mail: req.user.mail, "contacts._id": req.params.id };
    
    var updateObj = {};
    for (var property in req.body)
        if (req.body.hasOwnProperty(property))
            updateObj["contacts.$." + property] = req.body[property];

    var update = { $set: updateObj };

    var options = { 'new': true };
    
    console.log(query);
    console.log(update);

    User.findOneAndUpdate(query, update, options, function(err, updated) {
        console.log(err);
        if (err) res.status(500).json(err);
        else res.status(200).json(updated);
    });
});

// Remove a contact
router.delete('/contacts/:id', function(req, res) {
    var query = { mail: req.user.mail };

    var update = { $pull: { contacts: { _id: req.params.id } } };

    var options = { 'new': true };
    
    User.findOneAndUpdate(query, update, options, function(err, updated) {
        if (err) res.status(500).json(err);
        else res.status(200).json(updated);
    });
});

// 404
router.all('*', function(req, res) { res.status(404).send("Recurso no encontrado"); });