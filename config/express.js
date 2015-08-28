var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

module.exports = function (app, AV) {
    // 设置 view 引擎
    app.set('views', path.join(__dirname, '/../webapp'));
    app.set('view engine', 'ejs');

    app.use(express.static('public'));
    app.use(express.static('webapp'));
    app.use(express.static('bower_components'));

    app.use(AV.Cloud);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
};
