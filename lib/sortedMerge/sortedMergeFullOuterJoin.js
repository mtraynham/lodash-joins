var undef = require('../util/undefined');

/**
 * Sorted merge full outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var sortedMergeFullOuterJoin = function (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return a.concat(b);
    }
    a = _.sortBy(a, aAccessor);
    b = _.sortBy(b, bAccessor);
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
            r.unshift(bDatum);
            bVal = undef(bDatum = b.pop(), bAccessor);
        } else {
            r.unshift(_.assign({}, aDatum, bDatum));
            // TODO bVal could match multiple aVal; don't pop here.
            bVal = undef(bDatum = b.pop(), bAccessor);
            aMatch = true;
        }
    }
    if (bDatum) {
        r.unshift(bDatum);
    }
    if (aDatum && !aMatch) {
        r.unshift(aDatum);
    }
    return a.concat(b, r);
};

module.exports = sortedMergeFullOuterJoin;