const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');

router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('addStudent');
})

router.post('/addStudent', ensureAuthenticated, async (req, res) => {
    var errors = []

    const {
        studentName,
        studentPhoneNumber,
        parentPhoneNumber,
        schoolName,
        schoolNumber,
        roomNumber,
        studyClassNo
    } = req.body;

    if (!studentName || !studentPhoneNumber || !parentPhoneNumber || !schoolName || !schoolNumber || !roomNumber || !studyClassNo) {
        errors.push({ msg: 'Bütün Kısımları Eksiksiz Doldurduğunuzdan Emin Olun!' })
    }

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

router.post('/delete_:id', ensureAuthenticated, async (req, res) => {
    try {
        const studentId = req.params.id;
        await Student.findByIdAndDelete(studentId);
        res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});

router.post('/id_:id/attendance', ensureAuthenticated, async (req, res) => {
    var errors = []
    var studentId = req.params.id;

    const {
        date,
        courseExitTime,
        courseLateTime,
        courseDinnerTime,
        firstStudyTime,
        secondStudyTime,
        attendance
    } = req.body

    if (!date || !courseExitTime || !courseLateTime || !courseDinnerTime || !firstStudyTime || !secondStudyTime || !attendance) {
        errors.push({ msg: 'Bütün Kısımları Eksiksiz Doldurduğunuzdan Emin Olun!' })
    }

    try {
        const attendancer = new Attendance({
            studentId,
            date,
            courseExitTime,
            courseLateTime,
            courseDinnerTime,
            firstStudyTime,
            secondStudyTime,
            attendance
        });
        await attendancer.save();
        res.redirect(`/student/id_${studentId}/attendance-success?id=${studentId}`)
    } catch (err) {
        res.send(err)
    }
});

router.post('/id_:id/attendanceUpdate', ensureAuthenticated, async (req, res) => {
    console.log("Attendance endpoint reached")
    var errors = []
    var studentId = req.params.id;

    const {
        attendanceId,
        date,
        courseExitTime,
        courseLateTime,
        courseDinnerTime,
        firstStudyTime,
        secondStudyTime,
        attendance
    } = req.body

    console.log(req.body); // Check the request body

    if (!date || !courseExitTime || !courseLateTime || !courseDinnerTime || !firstStudyTime || !secondStudyTime || !attendance) {
        console.log('tüm kısımlar doldurulmalı')
        errors.push({ msg: 'Bütün Kısımları Eksiksiz Doldurduğunuzdan Emin Olun!' })
    }

    try {
        const attendanceRecord = await Attendance.findOne({ _id: attendanceId, date: date, studentId: req.params.id });
        if (!attendanceRecord) {
            res.status(200).send("Kayıt bulunamadı")
            res.redirect(`/student/id_${studentId}/attendance-success?id=${studentId}`)
        } else {
            attendanceRecord.courseExitTime = courseExitTime;
            attendanceRecord.courseLateTime = courseLateTime;
            attendanceRecord.courseDinnerTime = courseDinnerTime;
            attendanceRecord.firstStudyTime = firstStudyTime;
            attendanceRecord.secondStudyTime = secondStudyTime;
            attendanceRecord.attendance = attendance;
            await attendanceRecord.save();
            res.redirect(`/student/id_${studentId}/attendance-success?id=${studentId}`)
        }
    } catch (err) {
        res.send(err)
    }
});

router.post('/deleteAtt_:id', ensureAuthenticated, async (req, res) => {
    //const att
    try {
        const attendanceId = req.params.id;
        const attStu = await Attendance.findById(attendanceId);
        res.redirect(`/student/id_${attStu.studentId}/attendance-success?id=${attStu.studentId}`)
        await Attendance.findByIdAndDelete(attendanceId);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: 'Internal Server Error',
            message: err.message,
            stack: err.stack
        });

    }
});

router.get('/id_:id/attendance-success', ensureAuthenticated, async (req, res) => {
    const studentId = req.query.id;
    const students = await Student.find({
        _id: studentId
    })
    const attendances = await Attendance.find({
        studentId: studentId
    })
    res.render('student', {
        student: attendances,
        studentData: students
    })
});


module.exports = router;
