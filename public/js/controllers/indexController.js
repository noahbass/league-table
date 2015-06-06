app.controller('indexController', function($scope, $location, Page, dataFactory) {
    Page.setTitle('Create A New Table');

    $scope.status;
    $scope.recent;

    // fill the recent
    getTables();

    function getTables() {
        dataFactory.getTables()
            .success(function(data) {
                $scope.recent = data;
            })
            .error(function(error) {
                $scope.status = 'Unable to load recently created tables.';
            });
    }

    $scope.submit = function(isValid) {
        if(isValid) {
            console.log('form is valid');
        }

        var params = {
            title: $scope.title,
            results: $scope.results,
            zones: $scope.zones,
        };

        console.log(params);
        dataFactory.insertTable(params)
            .success(function(data) {
                $location.path('/' + data.id);
            })
            .error(function(error) {
                console.log('failure');
            });
    };

    // default data
    $scope.results = [
        { name1: 'Germany', score1: 4, score2: 0, name2: 'Portugal' },
        { name1: 'Ghana', score1: 1, score2: 2, name2: 'United States' },
        { name1: 'Germany', score1: 2, score2: 2, name2: 'Ghana' },
        { name1: 'United States', score1: 2, score2: 2, name2: 'Portugal' },
        { name1: 'United States', score1: 0, score2: 1, name2: 'Germany' },
        { name1: 'Portugal', score1: 2, score2: 1, name2: 'Ghana' },
    ];

    $scope.addResult = function() {
        $scope.results.push({ name1: '', score1: 0, score2: 0, name2: '' });
    };

    $scope.removeResult = function(index) {
        $scope.results.splice(index, 1);
    };
});
