const { config } = require('dotenv');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const mongoose = require("mongoose");
const flash = require('connect-flash');
const chalk = require('chalk')
const session = require('express-session');
const AsciiTable = require('ascii-table');


const app = express();
require('dotenv'),config();

let prvt = require("./package.json");

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log(chalk.green('MongoDB Connected')))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/student', require('./routes/student.js'));

var PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(chalk.black.bgRed("\n                                  \n██    ██  ██████  ███████ ██████  \n ██  ██  ██    ██ ██      ██   ██ \n  ████   ██    ██ ███████ ██   ██ \n   ██    ██    ██      ██ ██   ██ \n   ██     ██████  ███████ ██████  \n                                  \n"));
  console.log(chalk.red(`${prvt.version}`));
  console.log(chalk.yellow(`Name: ${prvt.name}\nDescription: ${prvt.description}\nGithub ${prvt.repository.url}`) + chalk.cyan(`\n\n${prvt.author}\n${prvt.license}`) + chalk.magenta(`\n\nTotal Modules: ${Object.keys(prvt.dependencies).length + Object.keys(prvt.devDependencies).length}`))
  var prvs = Object.keys(prvt.dependencies)
  var prv = Object.values(prvt.dependencies)
  var objKeys = [];
  var objValues = [];
  prvs.map(key => objKeys.push(key));
  prv.map(key => objValues.push(key));
  console.log(chalk.bgGray("\nName:Version\n"))
  for(var i = 0; i<objKeys.length; i++) {
    console.log(chalk.blue(objKeys[i] + ":" + objValues[i]));
  }
  console.log("\n")
});