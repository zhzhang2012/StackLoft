'use strict';

var StackLoftControllers = angular.module('StackLoft.controllers', []);

/**
 * Header template controller
 */
StackLoftControllers.controller('HeaderController', ['$scope', '$location', function ($scope, $location) {
    $scope.redirectTo = function (path) {
        $location.path(path);
    }
}]);

/**
 * Index page controller
 */
StackLoftControllers.controller('MainController', ['$scope', '$location', '$q', function ($scope, $location, $q) {
    var PAGE_SIZE = 6; // TODO: Move to service

    var Featured = AV.Object.extend('Featured');
    var featureQuery = new AV.Query(Featured);
    featureQuery.ascending('position');

    featureQuery.find({
        success: function (features) {
            $scope.mainFeature = {};                // Largest feature section
            $scope.sideFeatures = [];               // Three small feature sections

            angular.forEach(features, function (feature, index) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                // Fetch resources by its type
                if (feature.type == 0) {            // Service
                    feature.get('service').fetch({
                        success: function (service) {
                            deferred.resolve(service);
                        }, error: function (err) {
                            console.log(err);
                            deferred.reject(err);
                        }
                    })
                } else if (feature.type == 1) {     // Article
                    feature.get('article').fetch({
                        success: function (article) {
                            deferred.resolve(article);
                        }, error: function (err) {
                            deferred.reject(err);
                        }
                    })
                }

                // Render data in the corresponding section
                promise.then(function (data) {
                    if (index == 0)
                        $scope.mainFeature = data;
                    else
                        $scope.sideFeatures.push(data);
                }, function (err) {
                    console.log(err);
                })
            });
            $scope.$apply();
        },
        error: function () {
            console.log("Error loading services");
            $scope.$apply();
        }
    });

    // Render service lists
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

    // Render article lists
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
}]);

/**
 * Services list page controller
 */
StackLoftControllers.controller('ServicesController', ['$scope', '$location', function ($scope, $location) {
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
}]);

/**
 * Service detail page controller
 */
StackLoftControllers.controller('ServiceController', ['$scope', '$routeParams', '$location',
    function ($scope, $routeParams, $location) {
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
    }]);

/**
 * Articles list page controller
 */
StackLoftControllers.controller('ArticlesController', ['$scope', '$location', function ($scope, $location) {
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
}]);

/**
 * Article detail page controller
 */
StackLoftControllers.controller('ArticleController', ['$scope', '$routeParams', function ($scope, $routeParams) {
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
