var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose')
const mongodbUri = require('mongodb-uri')
var passport = require('passport');

require('./passport');

var config = require('./config');
var apiRouter = require('./routes/index');
var adminAuth = require('./routes/Admin/authetication');
var adminAdd = require('./routes/Admin/add_resort');
var adminEdit = require('./routes/Admin/editresort');

var homeRouter = require('./routes/Admin/home');

var app = express();

// allow cross origin on a different port
app.all('*',function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// connect to mongodb
mongoose.Promise = global.Promise
var uri = config.liveConnectString;
var mongooseConnectString = mongodbUri.formatMongoose(uri);
mongoose.connect(mongooseConnectString,{
	useNewUrlParser: true,
	reconnectInterval: Number.MAX_VALUE,
	reconnectInterval: 1000
 });

// Test for connection success
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', function callback () {
    console.log('Successfully connected to MongoDB');
});

global.User = require('./models/user');

app.use('/v1/api/resort', apiRouter);
app.use('/', adminAuth);
app.use('/', adminAdd);
app.use('/', adminEdit);
app.use('/', homeRouter);

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
