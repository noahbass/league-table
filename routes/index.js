var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'New Table',
    });
});

router.post('/', function(req, res, next) {
    var results = req.body.results;
    results = results.split('\r\n');
    var regex = /^(.*?) (\d+) - (\d+) (.*?)$/;

    var title = req.body.title,
        data  = [{ title: title }, []],
        clubs = [],
        table = data[1];


    /*
     * Given a key and an array, sort the array by the key
     *
     * @param key: string
     * @param array: array
     * @return int
     */
    function search(key, array){
        for(var i = 0; i < array.length; i++) {
            if(array[i].name === key) {
                return i;
            }
        }
    }

    /*
     * Given a team, goals for, and goals against: add integers and to each column in the table as needed,
     *
     * @param team: team name
     * @param for_: goals for
     * @param against: goals against
     * @return void
     */
    function add_result(team, for_, against) {
        var team = search(team, table);

        if(for_ > against) {
            table[team]['wins'] += 1;
            table[team]['points'] += 3;
        }
        else if(for_ < against) {
            table[team]['losses'] += 1;
        }
        else {
            table[team]['draws'] += 1;
            table[team]['points'] += 1;
        }

        table[team]['played'] += 1;
        table[team]['for'] += parseInt(for_);
        table[team]['against'] += parseInt(against);
        table[team]['diff'] = table[team]['for'] - table[team]['against'];
    }

    /*
     * Sort the table:
     * Team with most points in descending order. First tie-breaker is goal difference. Second tie-breaker is goals for
     *
     * @return int
     */
    function sortTable() {
        return function(a, b) {
            var result;

            // Try points first
            if(a['points'] < b['points']) {
                result = -1;
            }
            else if(a['points'] > b['points']) {
                result = 1;
            }

            // The two teams are tied on points, try goal difference
            else {
                if(a['diff'] < b['diff']) {
                    result = -1;
                }
                else if(a['diff'] > b['diff']) {
                    result = 1;
                }

                // The two teams are tied on goal difference, try goals for
                else {
                    if(a['for'] < b['for']) {
                        result = -1;
                    }
                    else if(a['for'] > b['for']) {
                        result = 1;
                    }
                }
            }

            return -result;
        }
    }

    /*
     * Push a team into the clubs array and table array (as new object)
     *
     * @param name: team name
     * @return void
     */
    function teamPush(name) {
        clubs.push(name);
        table.push({
            name: name,
            played: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            for: 0,
            against: 0,
            diff: 0,
            points: 0
        });
    }


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
                teamPush(match[1]);
            }
            if(clubs.indexOf(match[4]) < 0) {
                teamPush(match[4]);
            }

            add_result(match[1], match[2], match[3]);
            add_result(match[4], match[3], match[2]);
        }

        // sort the table after adding new data
        table.sort(sortTable());
    });


    res.render('table', {
        title: 'Table: ' + data[0].title,
        table: table
    });
});

module.exports = router;
