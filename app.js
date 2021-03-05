var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fileUpload = require('express-fileupload');

var session = require('express-session');

var User=require('./models/personal.model.js');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ventaRouter = require('./routes/venta');
var clienteRouter = require('./routes/cliente');
var apiRouter = require('./routes/api');
var gestionRouter = require('./routes/gestion');
var controlRouter = require('./routes/control');
var personalRouter = require('./routes/personal')

var app = express();

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));
app.engine('ejs', require('ejs-locals'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'ldkfjklsdjfsdjfsjdlfjsdlkfflkj234j2kh523-+42',
  saveUninitialized:true,
  resave:true
}));



var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;



app.use(passport.initialize());
app.use(passport.session());
var bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(bcrypt.hashSync(password,10));
    User.findOne({ login: username })
        .populate('Rol')
        .exec(function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      console.log(bcrypt.hashSync(password,10));
      console.log("password=",password,"-",user.password);
      if(!bcrypt.compareSync(password,user.password)){
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id)
  .populate('Rol')
  .exec(function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/venta', ventaRouter);
app.use('/cliente',clienteRouter);
app.use('/api',apiRouter);
app.use('/gestion', gestionRouter);
app.use('/control',controlRouter);
app.use('/personal', personalRouter)

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
