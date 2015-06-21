var path =require('path');

// Cargar DB SQLite:  Modelo ORM

var Sequelize = require('sequelize');
// User DB SQLite
var sequelize = new Sequelize(null, null, null,
                       {dialect: "sqlite", storage: "quiz.sqlite"}
                     );
// Importar la definicion de la tabla QUIZ de quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
exports.Quiz =Quiz; // exportar la definición de la tabla Quiz

// sequelize.sync() crea e inicializa la tabla de preguntas DB
sequelize.sync().success(function() {
  // success(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().success(function (count){
    if(count === 0) { //la tabla se inicializa solo si está vacía
         Quiz.create( { pregunta:  'Capital de Italia',
                        respuesta: 'Roma'
                        })
        .success(function(){console.log('Base de datos inicializada')});
      };
  });
});
