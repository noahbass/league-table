var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/index.html',
            controller: 'indexController',
            resolve: {
                pageTitle: function() {
                    return {'title': 'Create A New Table'}
                }
            }
        })
        .when('/two', {
            templateUrl: 'pages/two.html',
            controller: 'twoController',
            resolve: {
                pageTitle: function() {
                    return {'title': 'Two'}
                }
            }
        })
        .when('/three', {
            templateUrl: 'pages/three.html',
            controller: 'threeController',
            resolve: {
                pageTitle: function() {
                    return {'title': 'Three'}
                }
            }
        })
        .when('/404', {
            templateUrl: 'pages/error.html',
            controller: 'errorController',
            resolve: {
                pageTitle: function() {
                    return {'title': 'Table Not Found'}
                }
            }
        })
        .when('/:id', {
            templateUrl: 'pages/show.html',
            controller: 'showController',
            resolve: {
                pageTitle: function() {
                    return {'title': 'Show Table'}
                }
            }
        })
        .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);
});
