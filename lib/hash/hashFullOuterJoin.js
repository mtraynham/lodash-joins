/**
 * Hash full outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var hashFullOuterJoin = function (a, aAccessor, b, bAccessor) {
    var aidx = _.groupBy(a, aAccessor),
        bidx = _.groupBy(b, bAccessor),
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
                    r.push(_.assign({}, aVal[i], bVal[j]));
                }
            }
            delete bidx[aKey]; // Not performant
        } else {
            r = r.concat(aidx[aKey]);
        }
    }
    return r.concat(_.flatten(_.values(bidx)));
};

module.exports = hashFullOuterJoin;