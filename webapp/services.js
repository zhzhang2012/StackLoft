var StackLoftServices = angular.module('StackLoft.services', []);

StackLoftServices.factory('UtilService', ['$location', function ($location) {
    var jumpTo = function (url) {
        $location.path(url);
    };

    return {
        jumpTo: jumpTo
    }
}]);