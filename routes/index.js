var express = require('express');
var router = express.Router();
var movie = require('./movie');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
	title: 'Hello JC'
	});
});
router.get('/sess', function(req, res, next) {

  // 检查 session 中的 isVisit 字段
  // 如果存在则增加一次，否则为 session 设置 isVisit 字段，并初始化为 1。
  if(req.session.isVisit) {
    req.session.isVisit++;
    res.send('<p>the ' + req.session.isVisit + ' times coming</p>');
  } else {
    req.session.isVisit = 1;
    res.send("Welcome 1st here");
    console.log(req.session);
  };
});
router.get('/login', function(req, res, next) {
  res.render('login', { 
	title: 'LOGIN'
	});
});

router.post('/login', function(req, res, next) {
  var user={
	username:'admin',
	password:'admin'
  }
  if (req.body.username===user.username && req.body.password===user.password){
	res.redirect('/home')
  }
  res.redirect('/login');
});

router.get('/logout', function(req, res, next) {
  res.redirect('/');
});

router.get('/home', function(req, res, next) {
  var user={
	username:'admin',
	password:'admin'
  }
  res.render('home', { 
	title: 'Home' ,
	user: user
	});
});

router.get('/movie/add', movie.movieAdd);
router.post('/movie/add', movie.doMovieAdd);
router.get('/movie/:name', movie.movieAdd);
router.get('/movie/json/:name', movie.movieJSON);

module.exports = router;
