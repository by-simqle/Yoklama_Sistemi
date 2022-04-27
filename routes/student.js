const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const Student = require('../models/Student');

const { forwardAuthenticated } = require('../config/auth');

router.get('/add', forwardAuthenticated, (req,res) => {
    res.render('addStudent')
})

module.exports = router;