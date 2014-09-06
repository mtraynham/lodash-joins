var _ = require('lodash'),
    assign = _.assign,
    sortBy = _.sortBy,
    reduceRight = _.reduceRight,
    yieldRightSubList = require('../util/yieldRightSubList');

/**
 * Sorted merge inner join.  Resturns a new array.
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
var sortedMergeInnerJoin = function (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return [];
    }
    a = sortBy(a, aAccessor);
    b = sortBy(b, bAccessor);
    var r = [],
        aDatums = yieldRightSubList(a, aAccessor),
        bDatums = yieldRightSubList(b, bAccessor);
    while (aDatums && bDatums) {
        if (aDatums.val > bDatums.val) {
            aDatums = yieldRightSubList(a, aAccessor);
        } else if (aDatums.val < bDatums.val) {
            bDatums = yieldRightSubList(b, bAccessor);
        } else {
            r = reduceRight(aDatums.r, function (orevious, datum) {
                return reduceRight(bDatums.r, function (prev, cDatum) {
                    prev.unshift(assign({}, datum, cDatum));
                    return prev;
                }, []).concat(orevious);
            }, []).concat(r);
            aDatums = yieldRightSubList(a, aAccessor);
            bDatums = yieldRightSubList(b, bAccessor);
        }
    }
    return r;
};

module.exports = sortedMergeInnerJoin;