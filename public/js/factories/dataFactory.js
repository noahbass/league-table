/**
 * dataFactory
 */
app.factory('dataFactory', ['$http', function($http) {
    var base = '/api/v1';
    var dataFactory = {};

    /*
     * Get a list of created tables
     * GET /api/v1/
     */
    dataFactory.getTables = function() {
        return $http.get(base);
    };

    /*
     * Get a single table
     * GET /api/v1/:id
     */
    dataFactory.getTable = function(id) {
        return $http.get(base + '/' + id)
    };

    /*
     * Create a new table
     * POST /api/v1/
     */
    dataFactory.insertTable = function(data) {
        return $http({
            method: 'POST',
            url: base,
            data: data
        });
    };

    return dataFactory;
}]);
