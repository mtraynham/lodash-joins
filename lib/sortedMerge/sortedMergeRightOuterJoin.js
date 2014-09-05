var sortedMergeLeftOuterJoin = require('./sortedMergeLeftOuterJoin');

/**
 * Sorted merge right outer join.  Returns the b-array reference.
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var sortedMergeRightOuterJoin = function (a, aAccessor, b, bAccessor) {
    return sortedMergeLeftOuterJoin(b, bAccessor, a, aAccessor);
};

module.exports = sortedMergeRightOuterJoin;