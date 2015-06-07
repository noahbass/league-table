require('dotenv').load();

var express      = require('express'),
    path         = require('path'),
    favicon      = require('serve-favicon'),
    logger       = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    mongoose     = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost:27017/league-table');

app.use(favicon(__dirname + '/public/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/app.js')(app);

// redirect any non-hashed urls to hashed urls for angular
app.use('/*', function(req, res) {
    return res.sendFile(__dirname + '/public/index.html');
});

require('./routes/errors.js')(app);

module.exports = app;
