var _ = require('lodash'),
    filter = _.filter,
    some = _.some;

/**
 * Nested loop left semi join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var nestedLoopLeftSemiJoin = function (a, aAccessor, b, bAccessor) {
    var val,
        cval;
    return filter(a, function (datum) {
        val = aAccessor(datum);
        return some(b, function (oDatum) {
            cval = bAccessor(oDatum);
            return val <= cval && val >= cval;
        });
    });
};

module.exports = nestedLoopLeftSemiJoin;
