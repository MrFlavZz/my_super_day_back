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


app.use('/mysuperday/api/users', usersRouter);
app.use("/mysuperday/api/trajet", trajetRouter);
app.use("/mysuperday/api/biorythme", biorythmeRouter);
app.use("/mysuperday/api/horoscope", horoscopeRouter);
app.use("/mysuperday/api/traducteur", traducteurRouter);
app.use("/mysuperday/api/agenda", agendaRouter);
app.use("/mysuperday/api/calculatrice", calculatriceRouter);
app.use("/mysuperday/api/blocNotes", blocNotesRouter);
app.use("/mysuperday/api/meteo", meteoRouter);
app.use("/mysuperday/api/bourse",bourseRouter);



app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
module.exports = app;




