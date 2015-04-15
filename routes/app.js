module.exports = function(app) {
    var appController = require('./../controllers/app.js');

    app.get('/', appController.index);
    app.post('/', appController.store);

    app.post('/.json', appController.storeRaw);

    app.get('/:table_id', appController.show);
};
