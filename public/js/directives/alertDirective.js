/*
 * alertDirective
 */
app.directive('alert', function(alertService) {
    return {
        restrict: 'AE',
        link: function(scope, e, a, ctl) {
            scope.alert = alertService.alertObj;
        },
        template: '<div class="alert" ng-class="alert.type" ng-show="alert.show">{{ alert.msg }}</div>'
    };
});
