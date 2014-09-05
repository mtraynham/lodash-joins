var nestedLoopLeftSemiJoin = require('./nestedLoopLeftSemiJoin');

/**
 * Nested loop right semi join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var nestedLoopRightSemiJoin = function (a, aAccessor, b, bAccessor) {
    return nestedLoopLeftSemiJoin(b, bAccessor, a, aAccessor);
};

module.exports = nestedLoopRightSemiJoin;