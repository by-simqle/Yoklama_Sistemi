var mysql = require('mysql');
require('dotenv').config();

var con = mysql.createConnection({
  host: `localhost:${process.env.DBPORT}`,
  user: "simqle",
  password: "Salnedo..886677"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});