var hashInnerJoin = require('../lib/hash/hashInnerJoin'),
    sortedMergeInnerJoin = require('../lib/sortedMerge/sortedMergeInnerJoin'),
    nestedLoopInnerJoin = require('../lib/nestedLoop/nestedLoopInnerJoin'),
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
    name: 'Inner Joins Large',
    tests: {
        'Hash Inner Join': function () {
            return hashInnerJoin(left, accessor, right, accessor);
        },
        'Sorted Merge Inner Join': function () {
            return sortedMergeInnerJoin(left, accessor, right, accessor);
        },
        'Nested Loop Inner Join': function () {
            return nestedLoopInnerJoin(left, accessor, right, accessor);
        }
    }
};