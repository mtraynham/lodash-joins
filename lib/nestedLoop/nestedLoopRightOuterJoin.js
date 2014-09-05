var nestedLoopLeftOuterJoin = require('./nestedLoopLeftOuterJoin');

/**
 * Nested loop right outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var nestedLoopRightOuterJoin = function (a, aAccessor, b, bAccessor) {
    return nestedLoopLeftOuterJoin(b, bAccessor, a, aAccessor);
};

module.exports = nestedLoopRightOuterJoin;