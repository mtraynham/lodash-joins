var _ = require('lodash'),
    assign = _.assign,
    reduceRight = _.reduceRight;

/**
 * Nested loop inner join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var nestedLoopInnerJoin = function (a, aAccessor, b, bAccessor) {
    var val,
        cval;
    return reduceRight(a, function (previous, datum) {
        val = aAccessor(datum);
        return reduceRight(b, function (oPrevious, oDatum) {
            cval = bAccessor(oDatum);
            if (val <= cval && val >= cval) {
                oPrevious.unshift(assign({}, datum, oDatum));
            }
            return oPrevious;
        }, []).concat(previous);
    }, []);
};

module.exports = nestedLoopInnerJoin;
