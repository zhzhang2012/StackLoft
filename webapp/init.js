'use strict';

angular.module('StackLoft').run(function () {
    // Init AV
    AV.initialize("5tjsn45l6phzutp8yjqpk7oem4u09do6pn3x6if54a159vyy", "38rssx5ijxbw56f1pyoclyy0gnnod1qqm6t8l9omaesc1xu4");

    var LeanCloud = (function (params) {
        var ClassDefines = {
            Service: {
                attributes: ['description', 'features', 'name', 'brief']
            },
            Article: {
                attributes: ['title', 'brief', 'content']
            }
        };
        return {
            setup: function (params) {
                if (typeof params === 'object') {
                    ClassDefines = params;
                }
            },
            angularizeAll: function () {
                console.log('angularize,%s', JSON.stringify(ClassDefines));
                angular.forEach(ClassDefines, function (classDefine, className) {
                    var classObject = AV.Object.extend(className);
                    angular.forEach(classDefine.attributes, function (attr) {
                        Object.defineProperty(classObject.prototype, attr, {
                            get: function () {
                                return this.get(attr);
                            },
                            set: function (value) {
                                this.set(attr, value);
                            }
                        });
                    })
                })
            }
        }
    })();

    // Call the above function
    LeanCloud.angularizeAll();
});
