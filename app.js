var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


// TM - Instalado el modulo express-partials
var partials = require('express-partials');
// Modulo 8
var methodOverride =require('method-override');
var session =require('express-session');
//

var routes = require('./routes/index');
// var users = require('./routes/users');  TM-Modulo6-suprimir

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//tm-in  Modulo6
app.use(partials());
//tm-fin
// uncomment after placing your favicon in /public  TM-favicon unizar
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(bodyParser.urlencoded());  //Modulo8

app.use(cookieParser('Quiz 2015'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// auto-logout  en 2 minutos 
// Sugerencia de un compa de curso
// app.use(session({cookie:{maxAge:120000}}));

app.use(function(req, res, next) {
if (req.session.user) {
if (Date.now() - req.session.user.lastRequestTime > 2*60*1000) {
delete req.session.user;
} else {
req.session.user.lastRequestTime = Date.now();
}
}
next();
});


// Helpers dinamicos:
app.use(function(req, res, next) {

  // guardar path en session.redir para despues de login
  if (!req.path.match(/\/login|\/logout/)) {
    req.session.redir = req.path;
  }

  // Hacer visible req.session en las vistas
  res.locals.session = req.session;
  next();
});


app.use('/', routes);
// app.use('/users', users); TM-Modulo6-suprimir

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors: []
    });
});


module.exports = app;
