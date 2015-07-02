var express = require('express');
var router = express.Router();

// TM julio 2015 - Presguntas-Comentarios
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});

router.param('quizId', quizController.load);  //Autoload :quizId
router.param('commentId', commentController.load); // autoload :commentId

router.get('/author', function(req, res) {
   res.render('author', { author: 'Teresa', image: '/images/foto.png', errors: []});
});

// Definición de rutas de sesion
router.get('/login',  sessionController.new);     // formulario login
router.post('/login', sessionController.create);  // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión

//router.get('/search', function(req, res) { res.render('search', {}); });


router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
//Autorizacion
router.get('/quizes/new', 				   sessionController.loginRequired, quizController.new);
router.post('/quizes/create',              sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',   sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',        sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',     sessionController.loginRequired, quizController.destroy);
// Comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
// Moderar comentarios
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',
                                  sessionController.loginRequired, commentController.publish);

module.exports = router;
