// TM-in para la bd
var models = require('../models/models.js');
//TM-fin
//Autoload
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

// tm-in varias preguntas
exports.index = function(req, res) {
  models.Quiz.findAll().then
    (function(quizes) {
       res.render('quizes/index.ejs', { quizes: quizes});
    }
  ).catch(function(error) { next(error);})
};


//GET  /quizes/question  TM- JUnio 2015
exports.show = function(req, res) {
   res.render('quizes/show', { quiz: req.quiz});
};


// GET /quizes/:id/answer
exports.answer = function(req, res) {
    var resultado = "Respuesta incorrecta";
    if (req.query.respuesta === req.quiz.respuesta) {
        resultado='Respuesta correcta';
    }
    res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado});
};
