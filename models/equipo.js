//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var equipoSchema = mongoose.Schema({
    temp_user: {type: Number},
    num: {type: Number}
});

module.exports = mongoose.model('equipo',  equipoSchema);
