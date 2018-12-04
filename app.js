var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var equipo = require('./models/equipo');
var estado  = require('./models/estado');
var usuario  = require('./models/usuario');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ecoterm');
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//middleware para gestionar sockets io
app.use(function(req, res, next){
  res.io = io;
  next();
});

io.on('connection', function(socket){
  socket.on('app_set', function(msg){
    equipo.findOne({_id: "5c06c71b19cb9e1c198dbce2"})
    .exec(function(err, equipo_){
      if(equipo_){
        equipo_.temp_user = parseInt(msg);
        equipo_.save();
        console.log('cambiado!!!!')
      }
    })
  });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {app: app, server: server};
