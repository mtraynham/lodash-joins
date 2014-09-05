var _ = require('lodash'),
    assign = _.assign,
    groupBy = _.groupBy;

/**
 * Hash left outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var hashLeftOuterJoin = function (a, aAccessor, b, bAccessor) {
    var idx = groupBy(b, bAccessor),
        i = a.length,
        j = 0,
        r = [],
        aDatum = null,
        bDatums = null,
        aVal = null;
    while (i--) {
        aVal = aAccessor(aDatum = a[i]);
        if (aVal in idx) {
            bDatums = idx[aVal];
            j = bDatums.length;
            while (j--) {
                r.unshift(assign({}, aDatum, bDatums[j]));
            }
        } else {
            r.unshift(aDatum);
        }
    }
    return r;
};

module.exports = hashLeftOuterJoin;