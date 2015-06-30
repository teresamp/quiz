var path =require('path');

//Postgres DATABASE_URL=postgres://user:passwd@host:port/DATABASE_URL
// lo pongo en .env
//DATABASE_URL="postgres://gploygdvxspnva:7_6QKWYKAtQCvEVo2rax5JcXrG@ec2-54-83-205-164.compute-1.amazonaws.com:5432/d1tbm4uhbr2ish";
//SQLite DATABASE_URL= sqlite://:@:/

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name   = (url[6]||null);
var user      = (url[2]||null);
var pwd       = (url[3]||null);
var protocol  = (url[1]||null);
var dialect   = (url[1]||null);
var port      = (url[5]||null);
var host      = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

console.log ("Base de datos=" + DB_name);
console.log ("User=" + user);
console.log("pwd=" + pwd);
console.log("port=" + port);
console.log ("host= " + host);
console.log("protocol= " + protocol);
console.log("dialect= " + dialect );


// Cargar DB SQLite:  Modelo ORM

var Sequelize = require('sequelize');
// User DB SQLite
var sequelize = new Sequelize(DB_name, user, pwd,
                       { dialect: protocol,
                         protocol: protocol,
                         port:     port,
                         storage: storage,    // SQLite (.env)
                         omitNull: true     // solo Postgres
                        }
                     );

// var sequelize = new Sequelize('postgres://gploygdvxspnva:7_6QKWYKAtQCvEVo2rax5JcXrG@ec2-54-83-205-164.compute-1.amazonaws.com:5432/d1tbm4uhbr2ish');
// Importar la definicion de la tabla QUIZ de quiz.js

var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);
exports.Quiz =Quiz; // exportar la definición de la tabla Quiz

// sequelize.sync() crea e inicializa la tabla de preguntas DB
//sequelize.sync().success(function() {
sequelize.sync().then(function() {
  // success(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function (count) {
  //Quiz.count().success(function (count) {
    if(count === 0) { //la tabla se inicializa solo si está vacía
         Quiz.create({ pregunta:  'Capital de Italia',
                        respuesta: 'Roma',
                        tema: 'Humanidades'
                     })
         Quiz.create({ pregunta:  'Capital de Portugal',
                       respuesta: 'Lisboa',
                       tema: 'Humanidades'
                              })
        .then(function(){console.log('Base de datos inicializada')});
      };
  });
});
