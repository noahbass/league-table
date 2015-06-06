module.exports = function(app) {
    var appController = require('./../controllers/appController.js');

    app.get('/api/v1/', appController.index);
    app.post('/api/v1/', appController.store);

    app.get('/api/v1/:table_id', appController.show);

    app.get('/api/v1/:table_id/:update_code', function(req, res) {
        res.send('hello');
    });
};
