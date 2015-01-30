var hashLeftOuterJoin = require('./hashLeftOuterJoin');

/**
 * Hash right outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var hashRightOuterJoin = function (a, aAccessor, b, bAccessor) {
    return hashLeftOuterJoin(b, bAccessor, a, aAccessor);
};

module.exports = hashRightOuterJoin;
