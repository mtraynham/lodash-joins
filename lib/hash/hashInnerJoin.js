var _ = require('lodash'),
    assign = _.assign,
    groupBy = _.groupBy;

/**
 * Hash inner join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var hashInnerJoin = function (a, aAccessor, b, bAccessor) {
    var idx = null,
        i = 0,
        j = 0,
        r = [],
        datum = null,
        oDatums = null,
        val = null;
    if (a.length < b.length) {
        idx = groupBy(a, aAccessor);
        i = b.length;
        while (i--) {
            val = bAccessor(datum = b[i]);
            if (val in idx) {
                oDatums = idx[val];
                j = oDatums.length;
                while (j--) {
                    r.unshift(assign({}, oDatums[j], datum));
                }
            }
        }
    } else {
        idx = _.groupBy(b, bAccessor);
        i = a.length;
        while (i--) {
            val = aAccessor(datum = a[i]);
            if (val in idx) {
                oDatums = idx[val];
                j = oDatums.length;
                while (j--) {
                    r.unshift(assign({}, datum, idx[val]));
                }
            }
        }
    }
    return r;
};

module.exports = hashInnerJoin;