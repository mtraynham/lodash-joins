var hashLeftSemiJoin = require('./hashLeftSemiJoin');

/**
 * Hash right semi join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var hashRightSemiJoin = function (a, aAccessor, b, bAccessor) {
    return hashLeftSemiJoin(b, bAccessor, a, aAccessor);
};

module.exports = hashRightSemiJoin;