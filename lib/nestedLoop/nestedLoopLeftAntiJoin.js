var _ = require('lodash'),
    every = _.every,
    filter = _.filter;

/**
 * Nested loop left anti join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var nestedLoopLeftAntiJoin = function (a, aAccessor, b, bAccessor) {
    var val,
        cval;
    return filter(a, function (datum) {
        val = aAccessor(datum);
        return every(b, function (oDatum) {
            cval = bAccessor(oDatum);
            return !(val <= cval && val >= cval);
        });
    });
};

module.exports = nestedLoopLeftAntiJoin;
