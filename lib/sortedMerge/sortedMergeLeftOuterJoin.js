var _ = require('lodash'),
    assign = _.assign,
    sortBy = _.sortBy,
    undef = require('../util/undefined');

/**
 * Sorted merge left outer join. Returns the a-array reference.
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var sortedMergeLeftOuterJoin = function (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return a;
    }
    a = sortBy(a, aAccessor);
    b = sortBy(b, bAccessor);
    var r = [],
        aDatum = a.pop(),
        bDatum = b.pop(),
        aVal = aAccessor(aDatum),
        bVal = bAccessor(bDatum),
        aMatch = false;
    while (aDatum && bDatum) {
        if (aVal > bVal) {
            if (!aMatch) {
                r.unshift(aDatum);
            }
            aVal = undef(aDatum = a.pop(), aAccessor);
            aMatch = false;
        } else if (aVal < bVal) {
            bVal = undef(bDatum = b.pop(), bAccessor);
        } else {
            r.unshift(assign({}, aDatum, bDatum));
            bVal = undef(bDatum = b.pop(), bAccessor);
            aMatch = true;
        }
    }
    if (aDatum && !aMatch) {
        r.unshift(aDatum);
    }
    return a.concat(r);
};

module.exports = sortedMergeLeftOuterJoin;