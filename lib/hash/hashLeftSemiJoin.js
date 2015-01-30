var _ = require('lodash'),
    filter = _.filter,
    has = _.has,
    indexBy = _.indexBy;

/**
 * Hash left semi join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var hashLeftSemiJoin = function (a, aAccessor, b, bAccessor) {
    var idx = indexBy(b, bAccessor);
    return filter(a, function (datum) {
        return has(idx, aAccessor(datum));
    });
};

module.exports = hashLeftSemiJoin;
