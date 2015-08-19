'use strict';

angular.module('StackLoft.controllers', [])
    .controller('MainController', ['$scope', function ($scope) {

    }])
    .controller('ServicesController', ['$scope', function ($scope) {
        var Service = AV.Object.extend('Service');
        var query = new AV.Query(Service);

        query.find({
            success: function (services) {
                $scope.$apply(function(){
                    console.log(services);
                    $scope.services = services;
                });
            },
            error: function () {
                console.log("Error loading services");
            }
        })
    }])
    .controller('ServiceController', ['$scope', '$routeParams', function ($scope, $routeParams) {

    }])
    .controller('ArticleController', ['$scope', function ($scope) {
        var Article = AV.Object.extend('Article');
        var query = new AV.Query(Article);

        query.find({
            success: function (articles) {
//                $scope.$apply(function(){
//                    console.log(services);
//                    $scope.services = services;
//                });
                //$scope.$apply(function(){
                    $scope.articles = articles;
                //})

            },
            error: function () {
                console.log("Error loading services");
            }
        })
    }]);
