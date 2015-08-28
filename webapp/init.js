'use strict';

angular.module('StackLoft').run(function () {
    // Init AV
    AV.initialize("5tjsn45l6phzutp8yjqpk7oem4u09do6pn3x6if54a159vyy", "38rssx5ijxbw56f1pyoclyy0gnnod1qqm6t8l9omaesc1xu4");

    /**
     * Service for enabling Angular 3-way binding in a LanCloud environment
     * @type {{setup, angularizeAll}}
     */
    var LeanCloud = (function (params) {
        /**
         * Attributes that will potentially be bound to views
         * should be registered here
         * @type {{Featured: {attributes: string[]}, Service: {attributes: string[]}, Article: {attributes: string[]}}}
         */
        var ClassDefines = {
            Featured: {
                attributes: ['service', 'article', 'type', 'position']
            },
            Service: {
                attributes: ['description', 'features', 'name', 'brief', 'logo']
            },
            Article: {
                attributes: ['title', 'keywords', 'content']
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
