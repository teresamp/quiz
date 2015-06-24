// TM-in para la bd
var models = require('../models/models.js');
//TM-fin
//Autoload

// TM-in
function replaceAll( text, busca, reemplaza ){
  while (text.toString().indexOf(busca) != -1)
  text = text.toString().replace(busca,reemplaza);
  return text;

}

//tm-fin

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

// GET /quizes
/* exports.index = function(req, res) {

	var resultado=req.query.search;
	if (resultado){
	resultado=replaceAll(resultado,' ','%');
	}
  models.Quiz.findAll(resultado ? {where: ["pregunta like ?", '%' + resultado + '%'], order: 'pregunta ASC'} : {}).then(
		function(quizes) {
			res.render('quizes/index', {quizes: quizes});
		}
	).catch(function(error) {next(error);});
};
*/

// tm-in varias preguntas  --
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
        resultado='Respuesta correcta';
    }
    res.render(
      'quizes/answer',
       { quiz: req.quiz, respuesta: resultado,
         errors: [] });
};
// GET  /quizes/new
exports.new = function(req, res) {
     var quiz = models.Quiz.build( // crea olbjeto quiz
       {pregunta: "Pregunta", respuesta: "Respuesta"}
    );
    res.render('quizes/new', { quiz: quiz, errors:[] });
};

// POST /quizes/create

exports.create = function(req, res) {
    var quiz = models.Quiz.build( req.body.quiz );
    var errors = quiz.validate();//ya qe el objeto errors no tiene then(
    if (errors)
    {
    var i=0; var errores=new Array();//se convierte en [] con la propiedad message por compatibilida con layout
    for (var prop in errors) errores[i++]={message: errors[prop]};
    res.render('quizes/new', {quiz: quiz, errors: errores});
    } else {
    quiz // save: guarda en DB campos pregunta y respuesta de quiz
    .save({fields: ["pregunta", "respuesta"]})
    .then( function(){ res.redirect('/quizes')}) ;
    }
    };


    // GET quizes/:id/edit
    export.edit = function(req, res) {
      var quiz = req.quiz; // Carga de quiz
      res.render('quizes/edirt', {quiz: quiz, errors: []});
    };

    //PUT /quizes/:id
    exports.update =function(req, res) {
      req.quiz.pregunta = req.body.quiz.pregunta;
      req.quiz.respuesta = req.body.quiz.respuesta;
      req.quiz.validate()
      .then(
           function(err) {
               if (err) {
                 res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});

               } else {
                 req.quiz
                 .save ({fields: ["pregunta", "respuesta"]})
                 .then( function() { res.redirct('quizes');});
               }
           }
      );
    };

    export.destroy = function(req, res) {
      req.quiz.destroy().then( function() {
      res.direct(/quizes);
    }).catch(function(error) {next(error)});
    };
