import sortBy from 'lodash/sortBy';
import isUndefined from './internal/isUndefined';

/**
 * Sorted merge left semi join.  Returns a new array.
 * @param  {Array<Object>} a
 * @param  {AccessorFunction} aAccessor
 * @param  {Array<Object>} b
 * @param  {AccessorFunction} bAccessor
 * @return {Array<Object>}
 */
export default function sortedMergeLeftSemiJoin (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return [];
    }
    const aSorted = sortBy(a, aAccessor),
        bSorted = sortBy(b, bAccessor),
        r = [];
    let aDatum = aSorted.pop(),
        bDatum = bSorted.pop(),
        aVal = aAccessor(aDatum),
        bVal = bAccessor(bDatum);
    while (aDatum && bDatum) {
        if (aVal > bVal) {
            aVal = isUndefined(aDatum = aSorted.pop(), aAccessor);
        } else if (aVal < bVal) {
            bVal = isUndefined(bDatum = bSorted.pop(), bAccessor);
        } else {
            r.unshift(aDatum);
            aVal = isUndefined(aDatum = aSorted.pop(), aAccessor);
        }
    }
    return r;
}
