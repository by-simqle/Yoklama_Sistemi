const { model, Schema } = require('mongoose');
let mac_adress = [];


const AttendanceSchema = new Schema({
    courseExitTime: {
        type: Date,
      },
      courseLateTime: {
        type: Date,
      },
      courseDinnerTime: {
        type: Boolean
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

const Attendance = model('Attendance', AttendanceSchema);

module.exports = Attendance;