var express = require('express');
const passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});
router.post('/login', passport.authenticate('local',{
  successRedirect:'/cliente/buscar',
  failureRedirect:'/login'
}));
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
