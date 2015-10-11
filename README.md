## [League Table Generator](http://leaguetable.noahbass.com/)

A Node.js league table generator based on [bakert/League-Table-Generator](https://github.com/bakert/League-Table-Generator).

[Live demo](http://leaguetable.noahbass.com/)

### Generator

![Table View](/screenshots/view-table.jpg)

#### Tie Breakers

The generator uses english premier league rules for two teams tied for position in points as found in the [Premier League Handbook](http://m.premierleague.com/content/dam/premierleague/site-content/News/publications/handbooks/premier-league-handbook-2014-15.pdf) (page 96):

> C.7: Subject to Rule C.14, if any 2 or more Clubs have scored the same number of points, have the same goal difference and have scored the same number of goals in League Matches in that Season they shall be deemed to occupy the same position in the table.

If the two teams are still tied, then they will be listed by alphabetical order in the table.

### TODO

- add import data with csv
- add updating table by unique editing url that is generated with the initial table
- add better error messages for generator
