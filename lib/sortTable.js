/**
 * Sort the table:
 * Team with most points in descending order. First tie-breaker is goal
 * difference. Second tie-breaker is goals for. Third tie-breaker is team name
 * alphabetical order
 *
 * @return int
 */

function sortor(element, a, b, callback) {
    if(a[element] < b[element]) {
        result = -1;
    }
    else if(a[element] > b[element]) {
        result = 1;
    }
    else {
        callback();
    }
};

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

                // The teams are tied on goals for, organize by name
                else {
                    if(a['name'] < b['name']) {
                        result = 1;
                    }
                    else if(a['name'] > b['name']) {
                        result = -1;
                    }
                }
            }
        }

        return -result;
    }
};

module.exports = sortTable;
