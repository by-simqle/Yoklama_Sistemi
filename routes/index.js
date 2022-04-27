const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require("../models/User");
// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, async(req, res) => {
  var all = await User.find({});
  res.render('dashboard', {
    user: req.user,
    data: all
  })
});

module.exports = router;