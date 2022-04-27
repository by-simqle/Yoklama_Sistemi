const mongoose = require('mongoose');
let mac_adress = [];


const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  parentPhoneNumber: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
 
  schoolName: {
    type: String,
    required: true
  },
  schoolNumber: {
    type: String,
    required: true
  },
  roomNumber: {
    type: String,
    required: true,
  },
  courseExitTime: {
    type: Date,
  },
  courseLateTime: {
    type: Date,
  },
  courseDinnerTime: {
    type: Boolean
  },
  studyClassNo: {
    type: String,
    required: true
  },
  firstStudyTime: {
    type: Boolean
  },
  secondStudyTime: {
    type: Boolean
  },
  attendance: {
    type: Boolean
  }
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;