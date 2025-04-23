var express = require('express');
var passport = require('passport');
var router = express.Router();
var Account = require('../models/account');

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

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
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

router.get('/update', dogCollection.dog_update_Page);