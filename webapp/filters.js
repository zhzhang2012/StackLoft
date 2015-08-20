'use strict';

angular.module('StackLoft')
    .filter('renderHTML', ['$sce', function ($sce) {
        return function (content) {
            return $sce.trustAsHtml(content);
        }
    }]);