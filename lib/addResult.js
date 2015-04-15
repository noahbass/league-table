/*
 * Given a team, goals for, and goals against: add integers and to each column in the table as needed,
 *
 * @param table
 * @param team: team name
 * @param for_: goals for
 * @param against: goals against
 * @return void
 */

var search = require('./search.js');

function addResult(table, team, for_, against) {
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

module.exports = addResult;
