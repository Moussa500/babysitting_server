var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require("http");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRouter');
var authRouter = require('./routes/authRouter');
var permissionRoute=require('./routes/permissionRoute');
var bookingRoute=require('./routes/bookingRoute');
var articleRoute=require('./routes/articleRouter');
var favoriteRoute=require('./routes/favoriteRoute');
require("dotenv").config(); 
const { connectToMongoDB } = require("./db/db")
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/permission',permissionRoute);
app.use('/booking',bookingRoute);
app.use('/article',articleRoute);
app.use('/favorite',favoriteRoute)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
const server = http.createServer(app);  //1
server.listen(process.env.PORT, () => { connectToMongoDB(), console.log(`app is running on port ${process.env.PORT}`) });