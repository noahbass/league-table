/**
 * app controller
 */

var search    = require('../lib/search.js'),
    addResult = require('../lib/addResult.js'),
    sortTable = require('../lib/sortTable.js'),
    teamPush  = require('../lib/teamPush.js');

var orm    = require('thin-orm'),
    moment = require('moment');
orm.table('tables')
   .columns('id', 'data', 'created_at');

var sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('./db.db'),
    driver = orm.createDriver('sqlite', { db: db }),
    tablesClient = orm.createClient(driver, 'tables');


exports.index = function(req, res) {
    tablesClient.findMany({ sort: { id: 'DESC' } }, function(error, result) {
        result = result.rows;

        result.forEach(function(entry) {
            entry.data = JSON.parse(entry.data);
        });

        res.render('index', {
            title: 'Create a New Table',
            data: result
        });
    });
};


exports.store = function(req, res, next) {
    var results = req.body.results,
        zones   = req.body.zones;
    results = results.split('\r\n');
    var regex = /^(.*?) (\d+) - (\d+) (.*?)$/;

    var title = req.body.title,
        data  = [{ title: title, input: results, table: [] }],
        clubs = [],
        table = data[0].table;

    // do matches
    results.forEach(function(result) {
        var match = regex.exec(result);

        // match
        // [1] => Team 1
        // [2] => Team 1 Score
        // [3] => Team 2 Score
        // [4] => Team 2

        // valid entry
        if(match) {
            if(clubs.indexOf(match[1]) < 0) {
                teamPush(match[1], clubs, table);
            }
            if(clubs.indexOf(match[4]) < 0) {
                teamPush(match[4], clubs, table);
            }

            addResult(table, match[1], match[2], match[3]);
            addResult(table, match[4], match[3], match[2]);
        }

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

    tablesClient.create({ data: {
        data: JSON.stringify(data),
        created_at: moment().format()
    }}, function(error, result) {
        if(error) {
            res.redirect('/');
        }
        else {
            res.redirect('/' + result.id);
        }
    });
};


exports.storeRaw = function(req, res) {
    res.json('{ hello: "hi" }');
}


exports.show = function(req, res) {
    var id = req.params.table_id;

    tablesClient.findById(id, function(error, result) {
        if(result === undefined) {
            res.redirect('/');
        }
        else {
            // convert text data back to json
            result.data = JSON.parse(result.data);

            res.render('table', {
                title: result.data[0].title,
                data: result,
                created_at: result.created_at
            });
        }
    });
};
