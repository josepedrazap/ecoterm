//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var usuarioSchema = mongoose.Schema({
    nombre: {type: String},
    pass: {type: String},
});

module.exports = mongoose.model('usuario',  usuarioSchema);
