require('dotenv').config();
const mongoose = require('mongoose');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Initialize Express
const app = express();
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
// MongoDB Connection (ONCE)
console.log('Mongo URI:', process.env.MONGO_CON);

mongoose.connect(process.env.MONGO_CON, {
  ssl: true,
  serverSelectionTimeoutMS: 5000, // 5 second timeout
  socketTimeoutMS: 45000,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dogRouter = require('./routes/dog');
const gridRouter = require('./routes/grid');
const pickRouter = require('./routes/pick');
const resourceRouter = require('./routes/resource');

app.use('/', indexRouter);  // Changed from '/index' to '/'
app.use('/users', usersRouter);
app.use('/dog', dogRouter);
app.use('/grid', gridRouter);
app.use('/randomitem', pickRouter);
app.use('/resource/dog', resourceRouter);

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Ensure status is set
  err.status = err.status || 500;

  // Render the error page
  res.status(err.status);
  res.render('error', {
    message: err.message,
    status: err.status,
    error: err
  });
});

module.exports = app;