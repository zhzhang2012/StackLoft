'use strict';

angular.module('StackLoft').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "partials/index.html",
                controller: "MainController"
            })
            .when('/services', {
                templateUrl: "partials/services.html",
                controller: "ServicesController"
            })
            .when('/services/:sid', {
                templateUrl: "partials/service.html",
                controller: "ServiceController"
            })
            .when('/articles/:aid', {
                templateUrl: "partials/article.html",
                controller: "ArticleController"
            })
    }]);
