'use strict';

angular.module('StackLoft.controllers', [])
    .controller('MainController', ['$scope', function ($scope) {

    }])
    .controller('ServicesController', ['$scope', '$location', function ($scope, $location) {
        var Service = AV.Object.extend('Service');
        var query = new AV.Query(Service);

        query.find({
            success: function (services) {
                $scope.services = services;
                $scope.$apply();
            },
            error: function () {
                console.log("Error loading services");
                $scope.$apply();
            }
        });

        $scope.showDetail = function(id) {
            $location.path('/services/' + id);
        }
    }])
    .controller('ServiceController', ['$scope', '$routeParams', function ($scope, $routeParams) {
        var Service = AV.Object.extend('Service');
        var query = new AV.Query(Service);

        query.get($routeParams.sid, {
            success: function (service) {
                $scope.service = service;
                $scope.$apply();
            },
            error: function () {
                console.log("Error loading services");
                $scope.$apply();
            }
        });
    }])
    .controller('ArticleController', ['$scope', function ($scope) {
        var Article = AV.Object.extend('Article');
        var query = new AV.Query(Article);

        query.find({
            success: function (articles) {
                $scope.articles = articles;
                $scope.$apply();
            },
            error: function () {
                console.log("Error loading articles");
                $scope.$apply();
            }
        })
    }]);
