var hashLeftAntiJoin = require('./hashLeftAntiJoin');

/**
 * Hash right anti join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var hashRightAntiJoin = function (a, aAccessor, b, bAccessor) {
    return hashLeftAntiJoin(b, bAccessor, a, aAccessor);
};

module.exports = hashRightAntiJoin;
