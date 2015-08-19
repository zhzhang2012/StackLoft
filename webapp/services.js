angular.module('StackLoft.services', [])
    .factory('UtilService', ['$location', function ($location) {
        var jumpTo = function (url) {
            $location.path(url);
        };

        return {
            jumpTo: jumpTo
        }
    }]);