import assign from 'lodash/object/assign';
import reduceRight from 'lodash/collection/reduceRight';
import sortBy from 'lodash/collection/sortBy';
import yieldRightSubList from './internal/yieldRightSubList';

/**
 * Sorted merge inner join.  Returns a new array.
 *
 * @param  {Object[]} a
 * @param  {Function} aAccessor
 * @param  {Object[]} b
 * @param  {Function} bAccessor
 * @return {Object[]}
 */
export default function sortedMergeInnerJoin (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return [];
    }
    a = sortBy(a, aAccessor);
    b = sortBy(b, bAccessor);
    let r = [],
        aGenerator = yieldRightSubList(a, aAccessor),
        aDatums = aGenerator.next().value,
        bGenerator = yieldRightSubList(b, bAccessor),
        bDatums = bGenerator.next().value;
    while (aDatums && bDatums) {
        if (aDatums.val > bDatums.val) {
            aDatums = aGenerator.next().value;
        } else if (aDatums.val < bDatums.val) {
            bDatums = bGenerator.next().value;
        } else {
            r = reduceRight(aDatums.r, (orevious, datum) => {
                return reduceRight(bDatums.r, (prev, cDatum) => {
                    prev.unshift(assign({}, datum, cDatum));
                    return prev;
                }, []).concat(orevious);
            }, []).concat(r);
            aDatums = aGenerator.next().value;
            bDatums = bGenerator.next().value;
        }
    }
    return r;
}
