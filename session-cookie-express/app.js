var createError = require ('http-errors');
var express = require ('express');
var path = require ('path');
var cookieParser = require ('cookie-parser');
var logger = require ('morgan');

const mongoose = require ('mongoose');

var session = require ('express-session');
var FileStore = require ('session-file-store') (session);

const url =
  'mongodb+srv://github:githubpassword@mongodb-github.vn7kz.mongodb.net/mongoDB-github?retryWrites=true&w=majority';
const connect = mongoose.connect (url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect.then (
  db => {
    console.log ("Youpi!! I'm connected to the db ");
  },
  err => {
    console.log (err);
  }
);

var indexRouter = require ('./routes/index');
var usersRouter = require ('./routes/users');
var dishRouter = require ('./routes/dishRouter');

var app = express ();

// view engine setup
app.set ('views', path.join (__dirname, 'views'));
app.set ('view engine', 'jade');

app.use (logger ('dev'));
app.use (express.json ());
app.use (express.urlencoded ({extended: false}));
// app.use(cookieParser());
app.use (express.static (path.join (__dirname, 'public')));

app.use (
  session ({
    name: 'session-id',
    secret: '12345678>9',
    saveUninitialized: false,
    resave: false,
    store: new FileStore (),
  })
);


app.use ('/', indexRouter);
app.use ('/users', usersRouter);

function auth (req, res, next) {
  console.log (req.headers);
  if (!req.session.user) {
      var err = new Error ('Not authorized ! XDD Lol !!! ');

      res.setHeader ('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next (err);
  } else {
    console.log("LL: auth -> req.session.user", req.session.user)

    if (req.session.user === 'authenticated') {
      next ();
    } else {
      var err = new Error (' You are not authorized !!! huhu ');
      err.status = 403;
      return next (err);
    }
  }
}

app.use (auth);

app.use ('/dishes', dishRouter);

// catch 404 and forward to error handler
app.use (function (req, res, next) {
  next (createError (404));
});

// error handler
app.use (function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get ('env') === 'development' ? err : {};

  // render the error page
  res.status (err.status || 500);
  res.render ('error');
});

module.exports = app;
