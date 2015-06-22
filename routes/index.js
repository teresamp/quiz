var express = require('express');
var router = express.Router();

// TM junio 2016
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.param('quizId', quizController.load);  //Autoload :quizId


router.get('/author', function(req, res, next) {
  res.render('author', { author: 'Teresa', image: '/images/foto_tm.jpg' });
});

/* GET Autores de la aplicacion */
router.get('/author', function(req, res) {
  res.render('author');
});

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);


module.exports = router;
