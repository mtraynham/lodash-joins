var _ = require('lodash'),
    indexBy = _.indexBy;

/**
 * Hash left semi join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var hashLeftSemiJoin = function (a, aAccessor, b, bAccessor) {
    var idx = indexBy(b, bAccessor),
        i = a.length,
        r = [],
        datum = null,
        val = null;
    while (i--) {
        val = aAccessor(datum = a[i]);
        if (val in idx) {
            r.unshift(datum);
        }
    }
    return r;
};

module.exports = hashLeftSemiJoin;