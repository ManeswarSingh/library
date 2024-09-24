const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');



router.get('/login', (req, res) => res.render('login'));

router.get('/register', (req, res) => res.render('register'));

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  let errors = [];

  if (!name || !email || !password) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (errors.length > 0) {
    res.render('register', { errors, name, email, password });
  } else {
    const user = new User({ name, email, password });
    await user.save();
    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/users/login');
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

module.exports = router;
