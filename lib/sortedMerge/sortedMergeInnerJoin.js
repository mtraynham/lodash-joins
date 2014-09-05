var undef = require('../util/undefined');

/**
 * Sorted merge inner join.  Resturns a new array.
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var sortedMergeInnerJoin = function (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return [];
    }
    a = _.sortBy(a, aAccessor);
    b = _.sortBy(b, bAccessor);
    var r = [],
        aDatum = a.pop(),
        bDatum = b.pop(),
        aVal = aAccessor(aDatum),
        bVal = bAccessor(bDatum);
    while (aDatum && bDatum) {
        if (aVal > bVal) {
            aVal = undef(aDatum = a.pop(), aAccessor);
        } else if (aVal < bVal) {
            bVal = undef(bDatum = b.pop(), bAccessor);
        } else {
            r.unshift(_.assign({}, aDatum, bDatum));
            bVal = undef(bDatum = b.pop(), bAccessor);
        }
    }
    return r;
};

module.exports = sortedMergeInnerJoin;