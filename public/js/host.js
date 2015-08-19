var appId = "gw3d6lurzy2cctooetwoqygn810e9vyij7ihacomozpi7qzy";
var appKey = "0h91tvoy30qk8ojwty3tqyad2hahteg4lbs4q3z17p3n4j5h";
var AVPush = AV.push({
    appId: appId,
    appKey: appKey
});

AVPush.open(function() {
    console.log('Connected to server.');
});

var subscribe = function () {
    var channelId = document.getElementById("channelId");
    AVPush.subscribe([channelId.value], function() {
        console.log("Successfully subscribed to channel: " + channelId.value);
    })
};

AVPush.on('message', function(data) {
    console.log('Received a new message from the data you listened.');
    console.log(JSON.stringify(data));
});

// 监听网络异常，SDK 会在底层自动重新连接服务器
AVPush.on('reuse', function() {
    console.log('Reconnecting...');
});