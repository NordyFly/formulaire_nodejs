const router = require('express').Router();
const {
  homeCtrl,
  postTask,
  usersCtrl,
  tasksCtrl
} = require('../controllers/app.ctrl');

router.get('/home', homeCtrl);
router.post('/todos/create', postTask);
router.get('/user', usersCtrl);
router.get('/task', tasksCtrl);

router.get('*', (req, res) => res.redirect('/home'));

module.exports = router;
