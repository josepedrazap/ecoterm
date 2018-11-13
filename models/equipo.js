//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var equipoSchema = mongoose.Schema({
    temp_user: {type: Number},
    id_usuario: {type: Schema.Types.ObjectId, ref: 'usuario'},
    num: {type: String}

});

module.exports = mongoose.model('equipo',  equipoSchema);
