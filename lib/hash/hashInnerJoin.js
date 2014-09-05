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
        idx = _.indexBy(a, aAccessor);
        i = b.length;
        while (i--) {
            val = bAccessor(datum = b[i]);
            if (val in idx) {
                oDatums = val[idx];
                j = oDatums.length;
                while (j--) {
                    r.unshift(_.assign({}, oDatums[j], datum));
                }
            }
        }
    } else {
        idx = _.indexBy(b, bAccessor);
        i = a.length;
        while (i--) {
            val = aAccessor(datum = a[i]);
            if (val in idx) {
                oDatums = val[idx];
                j = oDatums.length;
                while (j--) {
                    r.unshift(_.assign({}, datum, idx[val]));
                }
            }
        }
    }
    return r;
};

module.exports = hashInnerJoin;