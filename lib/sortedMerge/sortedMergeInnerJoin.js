import sortBy from 'lodash/sortBy';
import mergeLists from './internal/mergeLists';
import yieldRightSubList from './internal/yieldRightSubList';

/**
 * Sorted merge inner join.  Returns a new array.
 * @param  {Array<Object>} a
 * @param  {Function} aAccessor
 * @param  {Array<Object>} b
 * @param  {Function} bAccessor
 * @return {Array<Object>}
 */
export default function sortedMergeInnerJoin (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return [];
    }
    const aSorted = sortBy(a, aAccessor),
        bSorted = sortBy(b, bAccessor),
        aGenerator = yieldRightSubList(aSorted, aAccessor),
        bGenerator = yieldRightSubList(bSorted, bAccessor);
    let r = [],
        aDatums = aGenerator.next().value,
        bDatums = bGenerator.next().value;
    while (aDatums && bDatums) {
        if (aDatums.val > bDatums.val) {
            aDatums = aGenerator.next().value;
        } else if (aDatums.val < bDatums.val) {
            bDatums = bGenerator.next().value;
        } else {
            r = mergeLists(aDatums.r, bDatums.r).concat(r);
            aDatums = aGenerator.next().value;
            bDatums = bGenerator.next().value;
        }
    }
    return r;
}
