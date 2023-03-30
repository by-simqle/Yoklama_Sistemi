const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require("../models/User");
const Student = require("../models/Student");
var students = ['null']
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

router.get('/dashboard', ensureAuthenticated, async(req, res) => {
  try {
    students = await Student.find({ });
  } catch (err) {
    console.log(err)
  }
  res.render('dashboard', {
    user: req.user,
    data: students
  })
});

module.exports = router;