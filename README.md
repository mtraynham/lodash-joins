lodash-joins
============
SQL-like joins for JavaScript Arrays.  LoDash is the only dependency and this is considered an extension of
that library.

Supported Types:
Full Outer-Joins
Inner-Joins
Left Anti-Joins
Left Outer-Joins
Left Semi-Joins
Right Anti-Joins
Right Outer-Joins
Right Semi-Joins

Missing Types:
Non-equi joins

Implementations:
Sorted Merge
Hash
Nested Loop

Usage:
Each join function expects the two arrays and an acccessor function that will act as the key-comparator.

Example:
var _ = require('index.js'),
    left = [
        {id: 'c', left: 0},
        {id: 'c', left: 1},
        {id: 'e', left: 2},
    ],
    right = [
        {id: 'a', right: 0},
        {id: 'b', right: 1},
        {id: 'c', right: 2},
        {id: 'c', right: 3},
        {id: 'd', right: 4},
        {id: 'f', right: 5},
        {id: 'g', right: 6}
    ],
    accessor = function (obj) {
        return obj['id'];
    };

var x = _.hashInnerJoin(left, accessor, right, accessor);
[
    {id: 'c', left: 0, right: 2},
    {id: 'c', left: 1, right: 2},
    {id: 'c', left: 0, right: 3},
    {id: 'c', left: 1, right: 3}
]

var y = _.nestedLoopLeftOuterJoin(left, accessor, right, accessor);
[
    {id: 'c', left: 0, right: 2},
    {id: 'c', left: 0, right: 3},
    {id: 'c', left: 1, right: 2},
    {id: 'c', left: 1, right: 3},
    {id: 'e', left: 2}
]

var z = _.sortedMergeFullOuterJoin(left, accessor, right, accessor);
[
    {id: 'a', right: 0},
    {id: 'b', right: 1},
    {id: 'c', left: 0, right: 2},
    {id: 'c', left: 0, right: 3},
    {id: 'c', left: 1, right: 2},
    {id: 'c', left: 1, right: 3},
    {id: 'd', right: 4},
    {id: 'e', left: 2},
    {id: 'f', right: 5},
    {id: 'g', right: 6}
]