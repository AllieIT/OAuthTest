// region Module imports
const express = require('express');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const passport = require('passport');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const connectDB = require('./config/db');
// endregion

const app = express();
dotenv.config({ path: './config/config.env'});
const ignore = connectDB();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

require('./config/passport')(passport)

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// region Middleware Setup
app.use(session({
  secret: 'i like cakes',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));

app.use('/', indexRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// endregion

module.exports = app;
