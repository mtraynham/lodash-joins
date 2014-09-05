var _ = require('lodash'),
    assign = _.assign,
    filter = _.filter,
    reduceRight = _.reduceRight;

/**
 * Nested loop left semi join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var nestedLoopFullOuterJoin = function (a, aAccessor, b, bAccessor) {
    var val,
        cval,
        found = {},
        tmpLength;
    return reduceRight(a, function (previous, datum) {
        val = aAccessor(datum);
        tmpLength = previous.length;
        previous = reduceRight(b, function (oPrevious, oDatum, index) {
            cval = bAccessor(oDatum);
            if (val <= cval && val >= cval) {
                found[index] = 0;
                oPrevious.unshift(assign({}, datum, oDatum));
            }
            return oPrevious;
        }, []).concat(previous);
        if (tmpLength === previous.length) {
            previous.unshift(datum);
        }
        return previous;
    }, []).concat(filter(b, function (datum, index) {
        return !(index in found);
    }));
};

module.exports = nestedLoopFullOuterJoin;