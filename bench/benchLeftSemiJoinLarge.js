var hashLeftSemiJoin = require('../lib/hash/hashLeftSemiJoin'),
    sortedMergeLeftSemiJoin = require('../lib/sortedMerge/sortedMergeLeftSemiJoin'),
    nestedLoopLeftSemiJoin = require('../lib/nestedLoop/nestedLoopLeftSemiJoin'),
    random = require('./util/random');

var spec = [
        {
            field: 'id',
            type: 'string',
            domain: ['a', 'e', 'i', 'o', 'u', 'y'],
            length: 1
        }
    ],
    left = random.randObjectArray(spec, 1000),
    right = random.randObjectArray(spec, 1000),
    accessor = function (obj) {
        return obj.id;
    };

module.exports = {
    name: 'Left Semi Joins Large',
    tests: {
        'Hash Left Semi Join': function () {
            return hashLeftSemiJoin(left, accessor, right, accessor);
        },
        'Sorted Merge Left Semi Join': function () {
            return sortedMergeLeftSemiJoin(left, accessor, right, accessor);
        },
        'Nested Loop Left Semi Join': function () {
            return nestedLoopLeftSemiJoin(left, accessor, right, accessor);
        }
    }
};