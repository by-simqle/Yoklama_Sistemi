const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.get('/add', (req, res) => {
    res.render('addStudent');
})

router.post('/addStudent', async (req, res) => {
    const {
        studentName,
        studentPhoneNumber,
        parentPhoneNumber,
        schoolName,
        schoolNumber,
        roomNumber,
        studyClassNo
    } = req.body;

    try {
        const student = new Student({
            studentName,
            studentPhoneNumber,
            parentPhoneNumber,
            schoolName,
            schoolNumber,
            roomNumber,
            studyClassNo
        });
        await student.save();
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
