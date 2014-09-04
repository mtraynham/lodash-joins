var sortedMergeLeftSemiJoin = require('./sortedMergeLeftSemiJoin');

/**
 * Sorted merge right semi join.  Returns the b-array reference.
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var sortedMergeRightSemiJoin = function (a, aAccessor, b, bAccessor) {
    return sortedMergeLeftSemiJoin(b, bAccessor, a, aAccessor);
};

module.exports = sortedMergeRightSemiJoin;