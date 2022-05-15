const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require("../models/User");
const Student = require("../models/Student");
// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, async(req, res) => {
  var all = await User.find({});
  var mall = await Student.find({});
  res.render('dashboard', {
    user: req.user,
    data: all,
    meta: mall
  })
});

module.exports = router;