var express = require('express');
var router = express.Router();

// TM junio 2016
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});

router.param('quizId', quizController.load);  //Autoload :quizId

router.get('/author', function(req, res) {
res.render('author', { author: 'Teresa', image: '/images/foto.png', errors: []});
});

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
// Para editar Modulo 8
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);



module.exports = router;
