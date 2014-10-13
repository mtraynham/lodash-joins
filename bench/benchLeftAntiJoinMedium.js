var hashLeftAntiJoin = require('../lib/hash/hashLeftAntiJoin'),
    sortedMergeLeftAntiJoin = require('../lib/sortedMerge/sortedMergeLeftAntiJoin'),
    nestedLoopLeftAntiJoin = require('../lib/nestedLoop/nestedLoopLeftAntiJoin'),
    random = require('./util/random');

var spec = [
        {
            field: 'id',
            type: 'string',
            domain: ['a', 'e', 'i', 'o', 'u', 'y'],
            length: 1
        }
    ],
    left = random.randObjectArray(spec, 100),
    right = random.randObjectArray(spec, 100),
    accessor = function (obj) {
        return obj.id;
    };

module.exports = {
    name: 'Left Anti Joins Medium',
    tests: {
        'Hash Left Anti Join': function () {
            return hashLeftAntiJoin(left, accessor, right, accessor);
        },
        'Sorted Merge Left Anti Join': function () {
            return sortedMergeLeftAntiJoin(left, accessor, right, accessor);
        },
        'Nested Loop Left Anti Join': function () {
            return nestedLoopLeftAntiJoin(left, accessor, right, accessor);
        }
    }
};