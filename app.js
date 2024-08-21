require('dotenv').config(); 
const http = require('http'); 
const path = require('path'); 
const createError = require('http-errors'); 
const cookieParser = require('cookie-parser'); 
const logger = require('morgan');
const { connectToMongoDB } = require('./db/db'); 
const usersRouter = require('./routes/usersRouter');
const authRouter = require('./routes/authRouter');

var express = require('express');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route handlers
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error'); 
});

const server = http.createServer(app);

server.listen(process.env.PORT || 5000, () => {
  connectToMongoDB();
  console.log(`App is running on port ${process.env.PORT || 5000}`);
});
