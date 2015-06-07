/*
 * appController
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
    // find all tables, sort them by created_at (newest is first),
    // then return the tables
    Table.find({}, null, {sort: {created_at: -1}}, function(error, result) {
        if(error) {
            res.status(500).json(error);
        }
        else {
            res.status(200).json(result);
        }
    });
};


/*
 * POST /api/v1
 */
exports.store = function(req, res, next) {
    // get form data: title, zones, and results
    var title   = req.body.title,
        zones   = req.body.zones,
        results = req.body.results;

    // setup arrays: data, clubs, and table
    var data  = [{ title: title, input: results, table: [] }],
        clubs = [],
        table = data[0].table;

    // add teams and results, then sort the table
    results.forEach(function(result) {
        // add both teams to clubs array if not already in the array
        if(clubs.indexOf(result.name1) < 0) {
            teamPush(result.name1, clubs, table);
        }
        if(clubs.indexOf(result.name2) < 0) {
            teamPush(result.name2, clubs, table);
        }

        // add result for each team
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

    // timestamp for created_at and updated_at
    var timestamp = moment().format();

    // create table data
    var table = new Table({
        data: data,
        created_at: timestamp,
        updated_at: timestamp
    });

    // save the table, then return the table id
    table.save(function(error, result) {
        if(error) {
            res.status(500).json(error);
        }
        else {
            res.status(200).json({
                id: result._id
            });
        }
    });
};


/*
 * GET /api/v1/:table_id
 */
exports.show = function(req, res) {
    // the table_id url parameter
    var id = req.params.table_id;

    // find the table by id, then return the table
    Table.findById(id, function(error, result) {
        if(error) {
            res.status(500).json(error);
        }
        else if(result == null) {
            res.status(404).json(result);
        }
        else {
            result.update_code = null;
            res.status(200).json(result);
        }
    });
};
