var nestedLoopLeftAntiJoin = require('./nestedLoopLeftAntiJoin');

/**
 * Nested loop right outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var nestedLoopRightAntiJoin = function (a, aAccessor, b, bAccessor) {
    return nestedLoopLeftAntiJoin(b, bAccessor, a, aAccessor);
};

module.exports = nestedLoopRightAntiJoin;
