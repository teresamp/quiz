// TM-in para la bd
var models = require('../models/models.js');
//TM-fin

//GET  /quizes/question  TM- JUnio 2015
exports.question = function(req, res) {
  models.Quiz.findAll().success(function(quiz) {
   res.render('quizes/question', { pregunta: quiz[0].pregunta})
   console.log( quiz[0].pregunta + ' =  ' + quiz[0].respuesta );
 })
};


// GET /quizes/answer
exports.answer = function(req, res) {

 models.Quiz.findAll().success(function(quiz) {
    if (req.query.respuesta === quiz[0].respuesta) {
      res.render('quizes/answer', { respuesta: 'Correcta'});
    } else {
      res.render('quizes/answer', { respuesta: 'Incorrecta'});
    }
  })
};
