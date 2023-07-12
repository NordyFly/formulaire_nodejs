const router = require('express').Router();
const {
  homeCtrl,
  servicesCtrl,
  contactCtrl,
  postTask,
  usersCtrl,
  tasksCtrl
} = require('../controllers/app.ctrl');

router.get('/home', homeCtrl);
router.post('/todos/create',postTask);
//console.log(`router.post`,router.post,postTask);
router.get('/services', servicesCtrl);
router.get('/contact', contactCtrl);
router.get('/user',usersCtrl);
router.get('/task',tasksCtrl);
router.get('*', (req, res) => res.redirect('/home'));
module.exports = router;