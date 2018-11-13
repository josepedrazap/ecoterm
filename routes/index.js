var express = require('express');
var router = express.Router();
var equipo = require('../models/equipo');
var estado  = require('../models/estado');
var usuario  = require('../models/usuario');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EcoTerm' });
});

//______________________________________________________
//______________________________________________________

//Logica aplicacion.
router.get('/get_temp_agua_user', function(req, res, next) {
  estado.findOne({id_equipo: req.query.id})
  .sort({arrive: 'desc'})
  .exec(function(err, estado_){
    if(estado_){
      return res.status(200).send({temp: estado_.temp, fecha: estado_.fecha});
    }else{
      return res.status(404).send('no se encuentra');
    }
  });
});

router.get('/set_temp_agua_user', function(req, res, next){
  equipo.findOne({id_usuario: req.query.id})
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
router.get('/set_temp_agua_equipo', function(req, res, next) {
  //subir datos a bdd
  let body = req.body;
  body.temp = req.temp;
  body.id_equipo = req.id_equipo;
  estado.create(body, (err, estado_) =>{
        if(err) throw err;
        if(estado_){
          return res.status(200).send('ok');
        }else{
          return res.status(500).send('err');
        }
  });
});

router.get('/get_temp_agua_equipo', function(req, res, next){
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

//Logicas de creacion
router.get('/crear_equipo', function(req, res, next){
    let body = req.body;
    body.id_usuario = req.query.id_usuario;
    body.num = '1';
    equipo.create(body, (err, equipo_) => {
      if(equipo_){
        return res.status(200).send(equipo_);
      }else{
        return res.status(500).send('err');
      }
    });
});

router.get('/crear_usuario', function(req, res, next){
    let body = req.body;
    body.nombre = req.query.nombre;
    body.pass = req.query.pass;

    usuario.create(body, (err, usuario_) => {
      if(err) throw err;
      if(usuario_){
        return res.status(200).send(usuario_);
      }else{
        return res.status(500).send('err');
      }
    });
});

router.get('/get_usuario', function(req, res, next){
  usuario.findOne({
    _id: req.query.id
  }).exec(function(err, usuario_){
    if(usuario_){
      return res.status(200).send(usuario_);
    }else{
      return res.status(404).send("no se encuentra");
    }
  })
});

router.get('/get_equipo', function(req, res, next){
  equipo.findOne({
    _id: req.query.id
  }).exec(function(err, equipo_){
    if(equipo_){
      return res.status(200).send(equipo_);
    }else{
      return res.status(404).send("no se encuentra");
    }
  })
});

router.get('/get_equipos', function(req, res, next){
  equipo.find().exec(function(err, equipo_){
    if(equipo_){
      return res.status(200).send(equipo_);
    }else{
      return res.status(404).send("no se encuentra");
    }
  })
});

router.get('/get_estados', function(req, res, next){
  estado.find({
    _id: req.query.id
  }).exec(function(err, estados_){
    if(estados_){
      return res.status(200).send(estados_);
    }else{
      return res.status(404).send("no se encuentra");
    }
  })
});


module.exports = router;
