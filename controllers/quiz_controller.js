// TM- Para la bd
var models = require('../models/models.js');

//Autoload
//
exports.load = function(req, res, next, quizId) {
  models.Quiz.find({
                  where: {id: Number(quizId)},
                  include: [{model: models.Comment}]
          }).then (
              function(quiz) {
                      if (quiz) {
                          req.quiz = quiz;
                          next();
                      } else {
                          next (new Error("No existe quizId=" + quizId));
                      }
              }).catch(function(error) { next(error);});
  };
//Créditos
exports.author=function(req,res){
	res.render('quizes/author',{errors:[]});
};
//  Varias preguntas  --
exports.index=function(req,res){
  var busqueda = "%";
    if (req.query.search !== undefined) {
        //busqueda ="%" + req.query.search.toLowerCase().replace(/[\s]/ig,"%") + "%";
        busqueda ="%" + req.query.search.replace(/[\s]/ig,"%") + "%";
    }
    models.Quiz.findAll({where: ["pregunta like ?", busqueda], order: 'pregunta ASC'}).then(function(quizes) {
    res.render('quizes/index.ejs', { quizes: quizes.sort(), errors: []});
}).catch(function(error) { next(error);});
};

// GET  /quizes/new
exports.new = function(req, res) {
     var quiz = models.Quiz.build( // crea objeto quiz
       {pregunta: "Pregunta", respuesta: "Respuesta", tema: "Otro"}
    );
    res.render('quizes/new', { quiz: quiz, errors:[] });
};

exports.show = function(req,res) {
  models.Quiz.findById(req.params.quizId).then(function(quiz) {
  res.render('quizes/show', {quiz: req.quiz, errors: []});
  })
};
// GET /quizes/:id/answer
exports.answer = function(req, res) {
  models.Quiz.findById(req.params.quizId).then(function(quiz) {
      var resultado = "Incorrecto";
      if (req.query.respuesta.toLowerCase() === req.quiz.respuesta.toLowerCase()) {
          resultado = "Correcto";
      }
      res.render('quizes/answer', {quiz: quiz, respuesta: resultado, errors: []});
  });
};

// POST /quizes/create
exports.create = function(req, res){
   var quiz = models.Quiz.build(req.body.quiz);
   quiz.validate().then(function(err){
     if(err) {
       res.render('quizes/new', {quiz: quiz, errors: err.errors});
     } else {
       // Guarda en BD los campos pregunta y respuesta de quiz
        quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function() {
            res.redirect('/quizes');
        }); // Redirecci�n HTTP a lista de preguntas
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
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;
  req.quiz.validate().then(function(err){
    if(err) {
      res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
    } else {
      // Guarda en BD los campos pregunta y respuesta de quiz
       req.quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function() {
           res.redirect('/quizes');
       }); // Redirecci�n HTTP a lista de preguntas
    }
  });
};

// Borrar
exports.destroy = function(req, res) {
      req.quiz.destroy().then( function() {
      res.redirect('/quizes');
    }).catch(function(error) {next(error)});
};
