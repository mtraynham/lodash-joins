var hashLeftOuterJoin = require('../lib/hash/hashLeftOuterJoin'),
    sortedMergeLeftOuterJoin = require('../lib/sortedMerge/sortedMergeLeftOuterJoin'),
    nestedLoopLeftOuterJoin = require('../lib/nestedLoop/nestedLoopLeftOuterJoin');

var left = [
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
        return obj.id;
    };

module.exports = {
    name: 'Left Outer Joins',
    tests: {
        'Hash Left Outer Join': function () {
            return hashLeftOuterJoin(left, accessor, right, accessor);
        },
        'Sorted Merge Left Outer Join': function () {
            return sortedMergeLeftOuterJoin(left, accessor, right, accessor);
        },
        'Nested Loop Left Outer Join': function () {
            return nestedLoopLeftOuterJoin(left, accessor, right, accessor);
        }
    }
};