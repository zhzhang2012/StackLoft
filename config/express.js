var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cloud = require('./../cloud');

module.exports = function (app) {
    // 设置 view 引擎
    app.set('views', path.join(__dirname, '/../webapp'));
    app.set('view engine', 'ejs');

    app.use(express.static('public'));
    app.use(express.static('webapp'));

    // 加载云代码方法
    app.use(cloud);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
};
