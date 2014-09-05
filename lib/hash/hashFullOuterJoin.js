var _ = require('lodash'),
    assign = _.assign,
    filter = _.filter,
    flatten = _.flatten,
    groupBy = _.groupBy,
    map = _.map,
    reduceRight = _.reduceRight,
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
        r = [],
        val = null,
        markedVals = {};
    if (a.length < b.length) {
        idx = groupBy(a, aAccessor);
        r = reduceRight(b, function (previous, datum) {
            markedVals[val = bAccessor(datum)] = 0;
            if (val in idx) {
                return map(idx[val], function (oDatum) {
                    return assign({}, oDatum, datum);
                }).concat(previous);
            }
            previous.unshift(datum);
            return previous;
        }, []);
    } else {
        idx = groupBy(b, bAccessor);
        r = reduceRight(a, function (previous, datum) {
            markedVals[val = aAccessor(datum)] = 0;
            if (val in idx) {
                return map(idx[val], function (oDatum) {
                    return assign({}, datum, oDatum);
                }).concat(previous);
            }
            previous.unshift(datum);
            return previous;
        }, []);
    }
    return r.concat(flatten(values(filter(idx, function (value, key) {
        return !(key in markedVals);
    }))));
};

module.exports = hashFullOuterJoin;