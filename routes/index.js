var express = require('express');
var router = express.Router();

// TM junio 2016
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
//res.render('index', { title: 'Quiz', error: []});
res.render('index', { title: 'Quiz'});
});

router.param('quizId', quizController.load);  //Autoload :quizId

//router.get('/author', function(req, res, next) {
//  res.render('author', { author: 'Teresa', image: '/images/foto.png' });
//});

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);


module.exports = router;
