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
 * Hash left outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var hashLeftOuterJoin = function (a, aAccessor, b, bAccessor) {
    var idx,
        val;
    if (a.length < b.length) {
        var markedVals = {};
        idx = groupBy(a, aAccessor);
        return reduceRight(b, function (previous, datum) {
            markedVals[val = bAccessor(datum)] = true;
            if (has(idx, val)) {
                return map(idx[val], function (oDatum) {
                    return assign({}, oDatum, datum);
                }).concat(previous);
            }
            return previous;
        }, []).concat(flatten(values(filter(idx, function (value, key) {
            return !has(markedVals, key);
        }))));
    } else {
        idx = groupBy(b, bAccessor);
        return reduceRight(a, function (previous, datum) {
            if (has(idx, (val = aAccessor(datum)))) {
                return map(idx[val], function (oDatum) {
                    return assign({}, datum, oDatum);
                }).concat(previous);
            }
            previous.unshift(datum);
            return previous;
        }, []);
    }
};

module.exports = hashLeftOuterJoin;
