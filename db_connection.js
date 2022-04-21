const mysql = require('mysql');
require('dotenv').config();
var con = mysql.createConnection({
  host: "192.168.1.36",
  user: "yourusername",
  password: "yourpassword"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
    });
});

module.exports = {
    con
}