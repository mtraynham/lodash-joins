var _ = require('lodash'),
    assign = _.assign,
    filter = _.filter,
    flatten = _.flatten,
    groupBy = _.groupBy,
    has = _.has,
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
    var idx,
        markedVals = {},
        result,
        val;
    if (a.length < b.length) {
        idx = groupBy(a, aAccessor);
        result = reduceRight(b, function (previous, datum) {
            markedVals[val = bAccessor(datum)] = true;
            if (has(idx, val)) {
                return map(idx[val], function (oDatum) {
                    return assign({}, oDatum, datum);
                }).concat(previous);
            }
            previous.unshift(datum);
            return previous;
        }, []);
    } else {
        idx = groupBy(b, bAccessor);
        result = reduceRight(a, function (previous, datum) {
            markedVals[val = aAccessor(datum)] = true;
            if (has(idx, val)) {
                return map(idx[val], function (oDatum) {
                    return assign({}, datum, oDatum);
                }).concat(previous);
            }
            previous.unshift(datum);
            return previous;
        }, []);
    }
    return result.concat(flatten(values(filter(idx, function (value, key) {
        return !has(markedVals, key);
    }))));
};

module.exports = hashFullOuterJoin;
