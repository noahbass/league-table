/*
 * app controller
 */

var search    = require('../lib/search.js'),
    addResult = require('../lib/addResult.js'),
    sortTable = require('../lib/sortTable.js'),
    teamPush  = require('../lib/teamPush.js'),
    Table     = require('../models/Table.js'),
    moment    = require('moment');

/*
 * GET /api/v1
 */
exports.index = function(req, res) {
    Table.find({}, null, {sort: {created_at: -1}}, function(error, result) {
        res.status(200).json(result);
    });
};


/*
 * POST /api/v1
 */
exports.store = function(req, res, next) {
    var results = req.body.results,
        zones   = req.body.zones;

    var title = req.body.title,
        data  = [{ title: title, input: results, table: [] }],
        clubs = [],
        table = data[0].table;

    results.forEach(function(result) {
        if(clubs.indexOf(result.name1) < 0) {
            teamPush(result.name1, clubs, table);
        }
        if(clubs.indexOf(result.name2) < 0) {
            teamPush(result.name2, clubs, table);
        }

        addResult(table, result.name1, result.score1, result.score2);
        addResult(table, result.name2, result.score2, result.score1);

        // sort the table after adding new data
        table.sort(sortTable());
    });

    // do promotion and relegation zones
    table.forEach(function(entry, index) {
        if(index < zones) {
            entry.zone = 'promotion';
        }
        else if(index < table.length && index >= table.length - zones) {
            entry.zone = 'relegation';
        }
        else {
            entry.zone = '';
        }
    });

    var timestamp = moment().format();

    var table = new Table({
        data: data,
        created_at: timestamp,
        updated_at: timestamp
    });

    table.save(function(error, result) {
        res.status(200).json({
            id: result._id
        });
    });
};


/*
 * GET /api/v1/:table_id
 */
exports.show = function(req, res) {
    var id = req.params.table_id;

    Table.findById(id, function(error, result) {
        if(result === null) {
            res.status(404).json(error);
        }
        else {
            result.update_code = null;
            res.status(200).json(result);
        }
    });
};
