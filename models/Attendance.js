const { model, Schema } = require('mongoose');

const AttendanceSchema = new Schema({
  studentId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  courseExitTime: {
    type: String,
    required: true
  },
  courseLateTime: {
    type: String,
    required: true
  },
  courseDinnerTime: {
    type: Boolean,
    required: true
  },
  firstStudyTime: {
    type: Boolean,
    required: true
  },
  secondStudyTime: {
    type: Boolean,
    required: true
  },
  attendance: {
    type: Boolean,
    required: true
  }
});

const Attendance = model('Attendance', AttendanceSchema);

module.exports = Attendance;