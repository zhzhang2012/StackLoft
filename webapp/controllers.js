'use strict';

angular.module('StackLoft.controllers', [])
    .controller('HeaderController', ['$scope', '$location', function ($scope, $location) {
        $scope.redirectTo = function (path) {
            $location.path(path);
        }
    }])
    .controller('MainController', ['$scope', '$location', function ($scope, $location) {
        var PAGE_SIZE = 5; // TODO: Move to service

        var Featured = AV.Object.extend('Featured');
        var featureQuery = new AV.Query(Featured);
        featureQuery.ascending('position');

        featureQuery.find({
            success: function (features) {
                $scope.features = [];
                angular.forEach(features, function (feature, index) {

                });
                $scope.$apply();
            },
            error: function () {
                console.log("Error loading services");
                $scope.$apply();
            }
        });

        var Service = AV.Object.extend('Service');
        var serviceQuery = new AV.Query(Service);
        serviceQuery.limit(PAGE_SIZE);

        serviceQuery.find({
            success: function (services) {
                $scope.services = services;
                $scope.$apply();
            },
            error: function () {
                console.log("Error loading services");
                $scope.$apply();
            }
        });

        var Article = AV.Object.extend('Article');
        var articleQuery = new AV.Query(Article);
        articleQuery.limit(PAGE_SIZE);

        articleQuery.find({
            success: function (articles) {
                $scope.articles = articles;
                $scope.$apply();
            },
            error: function () {
                console.log("Error loading services");
                $scope.$apply();
            }
        });

        $scope.redirect = function (path) {
            $location.path(path);
        }
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

        $scope.showDetail = function (id) {
            $location.path('/services/' + id);
        }
    }])
    .controller('ServiceController', ['$scope', '$routeParams', '$location', function ($scope, $routeParams, $location) {
        var Service = AV.Object.extend('Service');
        var query = new AV.Query(Service);

        query.get($routeParams.sid, {
            success: function (service) {
                $scope.service = service;
                var relation = service.relation('articles');
                relation.query().find({
                    success: function (articles) {
                        $scope.articles = articles;
                        $scope.$apply();
                    },
                    error: function () {
                        console.log("Error loading articles");
                    }
                });
                $scope.$apply();
            },
            error: function () {
                console.log("Error loading the service");
                $scope.$apply();
            }
        });

        $scope.showArticle = function (id) {
            $location.path('/articles/' + id);
        }
    }])
    .controller('ArticlesController', ['$scope', '$location', function ($scope, $location) {
        var Article = AV.Object.extend('Article');
        var query = new AV.Query(Article);

        query.find({
            success: function (articles) {
                $scope.articles = articles;
                $scope.$apply();
            },
            error: function () {
                console.log("Error loading the article");
                $scope.$apply();
            }
        });

        $scope.redirectTo = function (id) {
            $location.path('articles/' + id);
        }
    }])
    .controller('ArticleController', ['$scope', '$routeParams', function ($scope, $routeParams) {
        var Article = AV.Object.extend('Article');
        var query = new AV.Query(Article);

        query.get($routeParams.aid, {
            success: function (article) {
                $scope.article = article;
                $scope.$apply();
            },
            error: function () {
                console.log("Error loading the article");
                $scope.$apply();
            }
        })
    }]);
