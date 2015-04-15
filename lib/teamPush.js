/*
 * Push a team into the clubs array and table array (as new object)
 *
 * @param name: team name
 * @return void
 */
function teamPush(name, clubs, table) {
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

module.exports = teamPush;
