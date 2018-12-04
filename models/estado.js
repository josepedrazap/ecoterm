//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var estadoSchema = mongoose.Schema({
    temp: {type: Number},
    fecha: {type: Date, default: Date.now},
    num: {type: Number},
    id_equipo: {type: Schema.Types.ObjectId, ref: 'equipo'}
});

module.exports = mongoose.model('estado',  estadoSchema);
