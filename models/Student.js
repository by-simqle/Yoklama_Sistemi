const { model, Schema } = require('mongoose');

const StudentSchema = new Schema({
  studentName: {
    type: String,
    required: true
  },
  studentPhoneNumber: {
    type: String,
    required: true
  },
  parentPhoneNumber: {
    type: String,
    required: true
  },
  studentDate: {
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
  studyClassNo: {
    type: String,
    required: true
  }
});

const Student = model('Student', StudentSchema);

module.exports = Student;