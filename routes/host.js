var router = require('express').Router();
var AV = require('leanengine');

var Host = AV.Object.extend('Host');

router.get('/', function (req, res, next) {
    res.render('host');
});

router.post('/', function (req, res, next) {
    var objectId = req.body.objectId;
    var channelId = req.body.channelId;
    var host = new Host();
    host.save(
        {
            dataClass: "Todo",
            dataId: objectId,
            channelId: channelId
        }, {
            success: function (host) {
                console.log("Successfully subscribed to listen to data");
                res.redirect('/host');
            }, error: function (error) {
                console.log("Error subscribing: " + error);
            }
        });
});

module.exports = router;