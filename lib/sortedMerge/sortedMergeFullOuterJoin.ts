import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import mergeLists from './internal/mergeLists';
import yieldRightSubList from './internal/yieldRightSubList';

/**
 * Sorted merge left outer join.  Returns a new array.
 * @param  {Array<Object>} a
 * @param  {AccessorFunction} aAccessor
 * @param  {Array<Object>} b
 * @param  {AccessorFunction} bAccessor
 * @param  {MergerFunction} merger
 * @returns {Array<Object>}
 */
export default function sortedMergeLeftOuterJoin (a, aAccessor, b, bAccessor, merger) {
    if (a.length < 1 || b.length < 1) {
        return a.concat(b);
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
            r = map(aDatums.r, aDatum => merger(aDatum, null)).concat(r);
            aDatums = aGenerator.next().value;
        } else if (aDatums.val < bDatums.val) {
            r = map(bDatums.r, bDatum => merger(null, bDatum)).concat(r);
            bDatums = bGenerator.next().value;
        } else {
            r = mergeLists(aDatums.r, bDatums.r, merger).concat(r);
            aDatums = aGenerator.next().value;
            bDatums = bGenerator.next().value;
        }
    }
    while (bDatums) {
        r = map(bDatums.r, bDatum => merger(null, bDatum)).concat(r);
        bDatums = bGenerator.next().value;
    }
    while (aDatums) {
        r = map(aDatums.r, aDatum => merger(aDatum, null)).concat(r);
        aDatums = aGenerator.next().value;
    }
    return r;
}
