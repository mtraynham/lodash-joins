var _ = require('lodash'),
    assign = _.assign,
    flatten = _.flatten,
    groupBy = _.groupBy,
    values = _.values;

/**
 * Hash full outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var hashFullOuterJoin = function (a, aAccessor, b, bAccessor) {
    var idx = null,
        i = 0,
        j = 0,
        r = [],
        datum = null,
        val = null,
        cDatums = null,
        markedVals = {};
    if (a.length < b.length) {
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
            } else {
                r.unshift(datum);
            }
            markedVals[val] = true;
        }
    } else {
        idx = _.groupBy(b, bAccessor);
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
            markedVals[val] = true;
        }
    }
    for (var key in markedVals) {
        delete idx[key];
    }
    return r.concat(flatten(values(idx)));
};

module.exports = hashFullOuterJoin;