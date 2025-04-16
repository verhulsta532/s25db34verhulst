var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require("dotenv").config();
const connectionString = process.env.MONGO_CON
mongoose = require("mongoose");
mongoose.connect(connectionString);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dogRouter = require('./routes/dog');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var dog = require("./models/dog");
const { start } = require('repl');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/dog', dogRouter);
app.use('/users', usersRouter);
app.use('/grid', gridRouter);
app.use('/randomitem', pickRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

async function seedData() {
  try {
    // Delete all existing documents
    await dog.deleteMany({});

    // Create new product instances
    const instance1 = new dog({
      dog_name: 'Goldie',
      breed: "Golden Lab",
      age: 3,
    });

    const instance2 = new dog({
      dog_name: 'Ralph',
      breed: "Pitbull",
      age: 1,
    });

    const instance3 = new dog({
      dog_name:"Marus",
      breed: "Husky",
      age: 1,
    });

    // Save the new products
    await instance1.save();
    console.log('Dog 1 saved.');
    await instance2.save();
    console.log('Dog 2 saved.');
    await instance3.save();
    console.log('Dog 3 saved.');

    console.log('Data seeding complete!');
    mongoose.disconnect(); // Disconnect after seeding
  } catch (err) {
    console.error('Error seeding data:', err);
    mongoose.disconnect(); // Disconnect on error
  }
}

