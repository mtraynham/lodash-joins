var sortedMergeLeftAntiJoin = require('./sortedMergeLeftAntiJoin');

/**
 * Sorted merge right semi join.  Returns the b-array reference.
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var sortedMergeRightAntiJoin = function (a, aAccessor, b, bAccessor) {
    return sortedMergeLeftAntiJoin(b, bAccessor, a, aAccessor);
};

module.exports = sortedMergeRightAntiJoin;
