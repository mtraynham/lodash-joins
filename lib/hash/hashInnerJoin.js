var _ = require('lodash'),
    assign = _.assign,
    groupBy = _.groupBy,
    map = _.map,
    reduceRight = _.reduceRight;

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
        r = [],
        val = null;
    if (a.length < b.length) {
        idx = groupBy(a, aAccessor);
        r = reduceRight(b, function (previous, datum) {
            if ((val = bAccessor(datum)) in idx) {
                return map(idx[val], function (oDatum) {
                    return assign({}, oDatum, datum);
                }).concat(previous);
            }
            return previous;
        }, []);
    } else {
        idx = groupBy(b, bAccessor);
        r = reduceRight(a, function (previous, datum) {
            if ((val = aAccessor(datum)) in idx) {
                return map(idx[val], function (oDatum) {
                    return assign({}, datum, oDatum);
                }).concat(previous);
            }
            return previous;
        }, []);
    }
    return r;
};

module.exports = hashInnerJoin;