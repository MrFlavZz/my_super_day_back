require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const db = require("./models");
var fetch = require('node-fetch')



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var trajetRouter = require("./routes/trajet");
var biorythmeRouter = require("./routes/biorythme");
var horoscopeRouter = require("./routes/horoscope");
var traducteurRouter = require("./routes/traducteur");
var agendaRouter = require("./routes/agenda");
var calculatriceRouter =require("./routes/calculatrice");
var blocNotesRouter = require("./routes/blocNotes");
var meteoRouter = require("./routes/meteo");
var bourseRouter = require("./routes/bourse");





var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('json spaces', 2)
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/mysuperday', indexRouter);
app.use('/mysuperday/users', usersRouter);
app.use("/mysuperday/trajet", trajetRouter);
app.use("/mysuperday/biorythme", biorythmeRouter);
app.use("/mysuperday/horoscope", horoscopeRouter);
app.use("/mysuperday/traducteur", traducteurRouter);
app.use("/mysuperday/agenda", agendaRouter);
app.use("/mysuperday/calculatrice", calculatriceRouter);
app.use("/mysuperday/blocNotes", blocNotesRouter);
app.use("/mysuperday/meteo", meteoRouter);
app.use("/mysuperday/bourse",bourseRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});







app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;




