var express = require('express');
var router = express.Router();
var equipo = require('../models/equipo');
var estado  = require('../models/estado');
var usuario  = require('../models/usuario');
var io = require('socket.io');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EcoTerm' });
});



//______________________________________________________
//______________________________________________________

//Logica aplicacion.
router.get('/historial', function(req, res, next) {
  estado.find({id_equipo: req.query.id})
  .sort({arrive: 'desc'})
  .exec(function(err, estado_){
    if(estado_){
      return res.status(200).send({estados: estado_});
    }else{
      return res.status(404).send('no se encuentra');
    }
  });
});

router.get('/set_temp_equipo', function(req, res, next){
  equipo.findOne({_id: req.query.id})
  .exec(function(err, equipo_){
    if(equipo_){
      equipo_.temp_user = req.query.new_temp;
      equipo_.save();
      return res.status(200).send('actualizado');
    }else{
      return res.status(404).send('no se ha actualizado');
    }
  })
});
//______________________________________________________
//______________________________________________________

//Logica aparato.
router.get('/up_equipo', function(req, res, next) {
  estado.create({id_equipo: req.query.id, num: 1, temp: req.query.temp, tem_termo: req.query.temp_termo}, (err, estado_) =>{
        if(err) throw err;
        if(estado_){
          console.log(estado_)
          res.io.emit('app', req.query.temp);
          return res.status(200).send('ok');
        }else{
          return res.status(500).send('err');
        }
  });
});

router.get('/crear_equipo', (req, res, next) => {
  equipo.create({num: 1}, (err, equipo) => {
    if(err) throw err;
    if(equipo){
      return res.status(200).send(equipo);
    }else{
      return res.status(500).send('error fatal');
    }
  })
})

router.get('/get_data_equipo', function(req, res, next) {
  //subir datos a bdd
  equipo.findOne({_id: req.query.id})
  .exec(function(err, equipo_){
    if(equipo_){
      return res.status(200).send({temp: equipo_.temp_user});
    }else{
      return res.status(404).send("No se encuentra");
    }
  })
});

  //logica obtener temperatura definida por el usuario
router.get('/get_estados', function(req, res, next){
  estado.find().exec(function(err, estados_){
    if(estados_){
      return res.status(200).send(estados_);
    }else{
      return res.status(404).send("no se encuentra");
    }
  })
});

router.get('/get_equipos', function(req, res, next){
  equipo.find().exec(function(err, equipos_){
    if(equipos_){
      return res.status(200).send(equipos_);
    }else{
      return res.status(404).send("no se encuentra");
    }
  })
});



module.exports = router;
