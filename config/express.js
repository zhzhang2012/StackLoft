var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

module.exports = function (app, AV) {
    // Set view engine
    app.set('views', path.join(__dirname, '/../webapp'));
    app.set('view engine', 'ejs');

    // Host static files
    app.use(express.static('bower_components'));
    app.use(express.static('public'));
    app.use(express.static('webapp'));

    // Host cloud functions
    app.use(AV.Cloud);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
};
