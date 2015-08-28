/**
 * Created by Tony_Zhang on 8/27/15.
 */

var StackLoftDirectives = angular.module('StackLoft.directives', []);

/**
 * This directive is used for replacing container DOM
 * elements by the templates rendered by ng-view or ng-include
 */
StackLoftDirectives.directive('includeReplace', function () {
    return {
        require: 'ngInclude' || 'ngView',
        restrict: 'A', /* optional */
        link: function (scope, el, attrs) {
            el.replaceWith(el.children());
        }
    };
});