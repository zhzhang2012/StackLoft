/**
 * Created by Tony_Zhang on 8/27/15.
 */

angular.module('StackLoft.directives', [])
    .directive('includeReplace', function () {
        return {
            require: 'ngInclude' || 'ngView',
            restrict: 'A', /* optional */
            link: function (scope, el, attrs) {
                el.replaceWith(el.children());
            }
        };
    });