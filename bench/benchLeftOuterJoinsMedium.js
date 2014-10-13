var hashLeftOuterJoin = require('../lib/hash/hashLeftOuterJoin'),
    sortedMergeLeftOuterJoin = require('../lib/sortedMerge/sortedMergeLeftOuterJoin'),
    nestedLoopLeftOuterJoin = require('../lib/nestedLoop/nestedLoopLeftOuterJoin'),
    random = require('./util/random');

var spec = [
        {
            field: 'id',
            type: 'string',
            domain: ['a', 'e', 'i', 'o', 'u', 'y'],
            length: 1
        }
    ],
    left = random.randString(spec, 100),
    right = random.randString(spec, 100),
    accessor = function (obj) {
        return obj.id;
    };

module.exports = {
    name: 'Left Outer Joins Medium',
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