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
    var aidx = groupBy(a, aAccessor),
        bidx = groupBy(b, bAccessor),
        r = [],
        i = 0,
        j = 0,
        aVal = null,
        bVal = null;
    for (var aKey in aidx) {
        if (aKey in bidx) {
            aVal = aidx[aKey];
            i = aVal.length;
            while (i--) {
                bVal = bidx[aKey];
                j = bVal.length;
                while (j--) {
                    r.push(assign({}, aVal[i], bVal[j]));
                }
            }
            delete bidx[aKey]; // Not performant
        } else {
            r = r.concat(aidx[aKey]);
        }
    }
    return r.concat(flatten(values(bidx)));
};

module.exports = hashFullOuterJoin;