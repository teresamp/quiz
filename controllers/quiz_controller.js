// TM-in para la bd
var models = require('../models/models.js');
//TM-fin

// tm-in varias preguntas
exports.index = function(req, res) {
  models.Quiz.findAll().then(function(quizes) {
    res.render('quizes/index.ejs', { quizes: quizes});
  })
};

// NO se si tengo que quitar lo demas Modulo7 varias preguntas


//tm-fin varias preguntas


//GET  /quizes/question  TM- JUnio 2015
exports.show = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz) {
   res.render('quizes/show', { quiz: quiz});
 })
};


// GET /quizes/:id/answer
exports.answer = function(req, res) {

 models.Quiz.find(req.params.quizId).then(function(quiz) {
    if (req.query.respuesta === quiz.respuesta) {
      res.render('quizes/answer',
           { quiz:quiz, respuesta: 'Correcta'});
    } else {
      res.render('quizes/answer',
           { quiz: quiz, respuesta: 'Incorrecta'});
    }
  })
};
