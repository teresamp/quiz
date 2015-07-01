var express = require('express');
var router = express.Router();

// TM julio 2015 - Presguntas-Comentarios
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});

router.param('quizId', quizController.load);  //Autoload :quizId
router.param('commentId', commentController.load); // autoload :commentId

router.get('/author', function(req, res) {
   res.render('author', { author: 'Teresa', image: '/images/foto.png', errors: []});
});

//router.get('/search', function(req, res) { res.render('search', {}); });


router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
// Para editar Modulo 8
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);


module.exports = router;
