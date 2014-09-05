var undef = require('../util/undefined');

/**
 * Nested loop left outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var nestedLoopLeftOuterJoin = function (a, aAccessor, b, bAccessor) {
    var r = [],
        i = a.length,
        aDatum,
        bDatum,
        aVal,
        bVal;
    while ((aVal = undef(aDatum = a[i--], aAccessor))) {
        var j = b.length,
            k = r.length;
        while ((bVal = undef(bDatum = a[j--], bAccessor))) {
            if (aVal === bVal) {
                r.unshift(_.assign({}, aDatum, bDatum));
            }
        }
        if (r.length === k) {
            r.unshift(aDatum);
        }
    }
    return r;
};

module.exports = nestedLoopLeftOuterJoin;