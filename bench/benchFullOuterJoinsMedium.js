var hashFullOuterJoin = require('../lib/hash/hashFullOuterJoin'),
    sortedMergeFullOuterJoin = require('../lib/sortedMerge/sortedMergeFullOuterJoin'),
    nestedLoopFullOuterJoin = require('../lib/nestedLoop/nestedLoopFullOuterJoin'),
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
    name: 'Full Outer Joins Medium',
    tests: {
        'Hash Full Outer Join': function () {
            return hashFullOuterJoin(left, accessor, right, accessor);
        },
        'Sorted Merge Full Outer Join': function () {
            return sortedMergeFullOuterJoin(left, accessor, right, accessor);
        },
        'Nested Loop Full Outer Join': function () {
            return nestedLoopFullOuterJoin(left, accessor, right, accessor);
        }
    }
};