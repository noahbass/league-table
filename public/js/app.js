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
