const { config } = require('dotenv');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const mongoose = require("mongoose");
const flash = require('connect-flash');
const chalk = require('chalk')
const session = require('express-session');
const Image = require('ascii-art-image');


const app = express();
require('dotenv').config();

let prvt = require("./package.json");

require('./config/passport')(passport);

const db = require('./config/keys').mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log(chalk.green('MongoDB Connected')))
  .catch(err => console.log(err));

app.use(express.static('public'))
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/student', require('./routes/student.js'));

app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});

var image = new Image({
    filepath: './public/images/png2.png',
    alphabet:'hatching',
    width: 30,
    height: 30
});

app.listen(process.env.PORT, () => {
    image.write(function(err, rendered){
        console.log(rendered);
        console.log(chalk.red(`${prvt.version}`));
        console.log(chalk.yellow(`Name: ${prvt.name}\nDescription: ${prvt.description}\nGithub ${prvt.repository.url}`) + chalk.cyan(`\n\n${prvt.author}\n${prvt.license}`) + chalk.magenta(`\n\nTotal Modules: ${Object.keys(prvt.dependencies).length + Object.keys(prvt.devDependencies).length}`))
        console.log("\n")
        console.log(chalk.bgGrey(`http://127.0.0.1:${process.env.PORT}`))
    });
});