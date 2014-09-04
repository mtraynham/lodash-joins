/**
 * Hash left semi join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var hashLeftSemiJoin = function (a, aAccessor, b, bAccessor) {
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
                    r.unshift(oDatums[j]);
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
                    r.unshift(datum);
                }
            }
        }
    }
    return r;
};

module.exports = hashLeftSemiJoin;