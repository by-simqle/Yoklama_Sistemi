const express = require('express');
const router = express.Router();
// Load User model
const Student = require('../models/Student');

const { ensureAuthenticated } = require('../config/auth');

router.get('/add', ensureAuthenticated, (req,res) => {
    res.render('addStudent')
})

router.post('/add', ensureAuthenticated, (req,res) =>{
    const { name, phoneNumber, parentPhoneNumber, schoolName, schoolNumber, roomNumber, studyClassNo } = req.body;
    let errors = [];
    if (!name || !phoneNumber || !parentPhoneNumber || !schoolName || !schoolNumber || !roomNumber || !studyClassNo) {
      errors.push("heryeri doldurun")
    }
    if(errors.lenght > 0) {
      res.render('add', {
        name,
        phoneNumber,
        parentPhoneNumber,
        schoolName,
        schoolNumber,
        roomNumber,
        studyClassNo
      });  
    } else {
      const newStudent = new Student({
        name,
        phoneNumber,
        parentPhoneNumber,
        schoolName,
        schoolNumber,
        roomNumber,
        studyClassNo
      }).save();
    }
})

module.exports = router;