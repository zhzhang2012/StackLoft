var AV = require('leanengine');

var APP_ID = process.env.LC_APP_ID;
var APP_KEY = process.env.LC_APP_KEY;
var MASTER_KEY = process.env.LC_APP_MASTER_KEY;

AV.initialize(APP_ID, APP_KEY, MASTER_KEY);
AV.setProduction(true);

var app = require('express')();

require('./config/express')(app, AV);

require('./config/routes')(app);

require('./cloud/cloud');

// 端口一定要从环境变量 `LC_APP_PORT` 中获取。
var PORT = parseInt(process.env.LC_APP_PORT || 3000);
var server = app.listen(PORT, function () {
    console.log('Node app is running, port:', PORT);
});
