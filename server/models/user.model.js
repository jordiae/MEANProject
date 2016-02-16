var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
    //  The following code is the server side implementation of agendas and their contacts. Since it's not implemented in the frontend, it is commented out
    /*var ContactSchema = new Schema({
        name: { type: String, required: true },
        surname: String,
        company: String,
        phone: { type: Number, min: 9, max: 9 }
    });

    var AgendaSchema = new Schema({
        name: { type: String, required: true },
        contacts: { type: [ContactSchema], default: [] }
    });

    var UserSchema = new Schema({
        mail: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        agendas: { type: [AgendaSchema], default: [] }
    });*/

    var ContactSchema = new Schema({
        name: { type: String, required: true },
        surname: String,
        company: String,
        phone: { type: Number, min: 9, max: 9 }
    });

    var UserSchema = new Schema({
        mail: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        contacts: { type: [ContactSchema], default: [] }
    });

    mongoose.model('User', UserSchema, 'users');
};