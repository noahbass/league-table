app.controller('showController', function($scope, $routeParams, $location, Page, dataFactory) {
    $scope.url = $location.absUrl();

    // fill the recent
    getTable();

    function getTable() {
        dataFactory.getTable($routeParams.id)
            .success(function(data) {
                $scope.data = data;
                Page.setTitle('Table: ' + data.data[0].title);
            })
            .error(function(error) {
                //$scope.status = 'Unable to load recent table data';
                $location.path('/404');
            });
    }
});
