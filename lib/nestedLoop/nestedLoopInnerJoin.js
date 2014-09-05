var _ = require('lodash'),
    assign = _.assign,
    undef = require('../util/undefined');

/**
 * Nested loop inner join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var nestedLoopInnerJoin = function (a, aAccessor, b, bAccessor) {
    var r = [],
        i = a.length,
        aDatum,
        bDatum,
        aVal,
        bVal;
    while ((aVal = undef(aDatum = a[i--], aAccessor))) {
        var j = b.length;
        while ((bVal = undef(bDatum = a[j--], bAccessor))) {
            if (aVal === bVal) {
                r.unshift(assign({}, aDatum, bDatum));
            }
        }
    }
    return r;
};

module.exports = nestedLoopInnerJoin;