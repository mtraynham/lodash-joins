var _ = require('lodash'),
    assign = _.assign,
    flatten = _.flatten,
    groupBy = _.groupBy,
    values = _.values;

/**
 * Hash left outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var hashLeftOuterJoin = function (a, aAccessor, b, bAccessor) {
    var idx = null,
        i = 0,
        j = 0,
        r = [],
        datum = null,
        val = null,
        cDatums = null;
    if (a.length < b.length) {
        var markedVals = {};
        idx = groupBy(a, aAccessor);
        i = b.length;
        while (i--) {
            val = bAccessor(datum = b[i]);
            if (val in idx) {
                cDatums = idx[val];
                j = cDatums.length;
                while (j--) {
                    r.unshift(assign({}, cDatums[j], datum));
                }
            }
            markedVals[val] = true;
        }
        for (var key in markedVals) {
            delete idx[key];
        }
        r = r.concat(flatten(values(idx)));
    } else {
        idx = groupBy(b, bAccessor);
        i = a.length;
        while (i--) {
            val = aAccessor(datum = a[i]);
            if (val in idx) {
                cDatums = idx[val];
                j = cDatums.length;
                while (j--) {
                    r.unshift(assign({}, datum, cDatums[j]));
                }
            } else {
                r.unshift(datum);
            }
        }
    }
    return r;
};

module.exports = hashLeftOuterJoin;