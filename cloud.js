var AV = require('leanengine');

var Register = AV.Object.extend('Register');

/**
 * 一个简单的云代码方法
 */
AV.Cloud.define('hello', function (request, response) {
    response.success('Hello world!');
});

AV.Cloud.afterUpdate('Todo', function (request) {
    var query = new AV.Query('Host');
    query.equalTo("dataClass", "Todo");
    query.equalTo("dataId", request.object.objectId);
    query.select("channelId");

    query.find({
        success: function (channels) {
            var channelIds = [];
            for (var i = 0; i < channels.length; ++i) {
                channelIds.push(channels[i].get('channelId'));
            }
            AV.Push.send({
                channels: channelIds,
                data: {
                    msg: "Your registered data has been updated"
                }
            }, function (result) {
                if (result) {
                    console.log('Successfully send out the notification!');
                } else {
                    console.log('Error occurred when broadcasting');
                }
            });
        }, error: function (error) {
            console.log("Error occurred when broadcasting" + error.code + ' : ' + error.message);
        }
    })
})
;

module.exports = AV.Cloud;
