var _ = require('lodash'),
    filter = _.filter,
    indexBy = _.indexBy;

/**
 * Hash left anti join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var hashLeftAntiJoin = function (a, aAccessor, b, bAccessor) {
    var idx = indexBy(b, bAccessor);
    return filter(a, function (datum) {
        return !(aAccessor(datum) in idx);
    });
};

module.exports = hashLeftAntiJoin;