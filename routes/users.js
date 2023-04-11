const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login', { error: false }));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register', { errors: null }));

// Register
router.post('/register', (req, res) => {
  const { name, phoneNumber, password, password2 } = req.body;
  let errors = [];

  if (!name || !phoneNumber || !password || !password2) {
    errors.push({ msg: 'Lütfen Bütün Alanları Doldurun' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Şifreler Eşleşmiyor' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Şifre en az 6 karakter uzunluğunda olmalıdır' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      phoneNumber,
      password,
      password2
    });
  } else {
    User.findOne({ phoneNumber: phoneNumber }).then(user => {
      if (user) {
        errors.push({ msg: 'bu telefon numarası zaten kullanımda' });
        res.render('register', {
          errors,
          name,
          phoneNumber,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          phoneNumber,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'Kayıt Oldunuz Şimdi giriş yapabilirsiniz'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.render('login', { error: err.message });
    }
    if (!user) {
      return res.render('login', { error: info.message });
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/dashboard');
    });
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;