var express = require('express');
var passport = require('passport');
var router = express.Router();
var Account = require('../models/account');
const dogController = require('../controllers/dogCollection');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dog App', user: req.user });
});

/* GET registration page */
router.get('/register', function(req, res) {
  res.render('register', { 
    title: 'Dog App Registration',
    user: req.user 
  });
});

/* POST registration */
router.post('/register', function(req, res) {
  Account.findOne({ username: req.body.username })
    .then(function(user) {
      if(user != null) {
        console.log("exists " + req.body.username);
        return res.render('register', { 
          title: 'Registration',
          message: 'Existing User', 
          account: req.body.username 
        });
      }
      
      let newAccount = new Account({ username: req.body.username });
      Account.register(newAccount, req.body.password, function(err, user) {
        if (err) {
          console.log("db creation issue "+ err);
          return res.render('register', { 
            title: 'Registration',
            message: 'Registration error', 
            account: req.body.username 
          });
        }
        console.log('Success, redirect');
        res.redirect('/');
      });
    })
    .catch(function(err) {
      console.log("Error: " + err);
      return res.render('register', { 
        title: 'Registration',
        message: 'Registration error'
      });
    });
});

router.get('/login', function(req, res) {
  res.render('login', { 
    title: 'Dog App Login', 
    user: req.user 
  });
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), (req, res) => {
  // Successful authentication
  const redirectTo = req.session.returnTo || '/';
  delete req.session.returnTo;
  res.redirect(redirectTo);
});

router.get('/logout', function(req, res) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/ping', function(req, res) {
  res.status(200).send("pong!");
});

module.exports = router;

const secured = (req, res, next) => {
  if (req.user) {
    return next();
  }
  req.session.returnTo = req.originalUrl; // Remember the original URL
  res.redirect('/login');
};

router.get('/', dogController.dog_list);
router.get('/create', secured, dogController.dog_create_get);
router.post('/', secured, dogController.dog_create_post);
router.get('/:id', dogController.dog_detail);
router.get('/:id/update', secured, dogController.dog_update_page);
router.post('/:id/update', secured, dogController.dog_update_post);
router.get('/:id/delete', secured, dogController.dog_delete_get);
router.post('/:id/delete', secured, dogController.dog_delete);

module.exports = router;


