// TM- Para la bd
var models = require('../models/models.js');

//Autoload

function replaceAll( text, busca, reemplaza ){
  while (text.toString().indexOf(busca) != -1)
  text = text.toString().replace(busca,reemplaza);
  return text;

}
//
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId= '+ quizId)); }
    }
  ).catch(function(error) { next(error);});
};


//  Varias preguntas  --
exports.index = function(req, res) {
  models.Quiz.findAll().then
    (function(quizes) {
       res.render('quizes/index', { quizes: quizes, errors: []});
    }
  ).catch(function(error) { next(error);})
};


//GET  /quizes/question  TM- JUnio 2015
exports.show = function(req, res) {
   res.render('quizes/show', { quiz: req.quiz , errors: []});
};


// GET /quizes/:id/answer
exports.answer = function(req, res) {
    var resultado = "Respuesta incorrecta";
    if (req.query.respuesta === req.quiz.respuesta) {
        res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Respuesta correcta', errors:[]});
    }else {
        res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Respuesta incorrecta', errors:[]});
    };
};

// GET  /quizes/new
exports.new = function(req, res) {
     var quiz = models.Quiz.build( // crea olbjeto quiz
       {pregunta: "Pregunta", respuesta: "Respuesta", tema: "Otro"}
    );
    res.render('quizes/new', { quiz: quiz, errors:[] });
};

// POST /quizes/create
exports.create = function(req, res) {
    var quiz = models.Quiz.build( req.body.quiz );
    quiz.validate().then(function(err){
    if(err) {
      res.render('quizes/new', {quiz: quiz, errors: err.errors});
    } else {
      // Guarda en BD los campos pregunta y respuesta de quiz
       quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function() {
           res.redirect('/quizes');
       }); // Redirección HTTP a lista de preguntas
    }
   });
};

// GET quizes/:id/edit
exports.edit = function(req, res) {
      var quiz = req.quiz; // Carga de quiz
      res.render('quizes/edit', {quiz: quiz, errors: []});
};

//PUT /quizes/:id
exports.update = function(req, res) {
//  var quiz = models.Quiz.build( req.body.quiz );
// Si quito la anterior da error pero add una nueva pregunta con los cambios
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;
  // Faltan los errores
  req.quiz.validate().then(function(err){
   if(err) {
      res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
    } else {
      // Guarda en BD los campos pregunta y respuesta de quiz
       req.quiz.save({fields: ["pregunta", "respuesta"]}).then(function() {
           res.redirect('/quizes');
       }); // Redirección HTTP a lista de preguntas
    }
  });
};

exports.destroy = function(req, res) {
      req.quiz.destroy().then( function() {
      res.redirect('/quizes');
    }).catch(function(error) {next(error)});
};
