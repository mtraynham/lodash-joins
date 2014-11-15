var random = require('./random');

/**
 * Generate a join bench test
 * @param  {String} name
 * @param  {Integer} size
 * @param  {HashJoin} hashJoin
 * @param  {SortedMergeJoin} sortedMergeJoin
 * @param  {NestedLoopJoin} nestedLoopJoin
 * @return {BenchmarkSuite}
 */
var joinBench = function (name, size, hashJoin, sortedMergeJoin, nestedLoopJoin) {
    var spec = [
            {
                field: 'id',
                type: 'string',
                domain: ['a', 'e', 'i', 'o', 'u', 'y'],
                length: 1
            }
        ],
        left = random.randObjectArray(spec, size),
        right = random.randObjectArray(spec, size),
        accessor = function (obj) {
            return obj.id;
        };
    return {
        name: name,
        tests: {
            'Hash Join': function () {
                return hashJoin(left, accessor, right, accessor);
            },
            'Sorted Merge Join': function () {
                return sortedMergeJoin(left, accessor, right, accessor);
            },
            'Nested Loop Join': function () {
                return nestedLoopJoin(left, accessor, right, accessor);
            }
        }
    };
};

module.exports = joinBench;