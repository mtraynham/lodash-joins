import sortBy from 'lodash/sortBy';
import isUndefined from './internal/isUndefined';

/**
 * Sorted merge left semi join.  Returns a new array.
 * @param  {Array<Object>} a
 * @param  {Function} aAccessor
 * @param  {Array<Object>} b
 * @param  {Function} bAccessor
 * @return {Array<Object>}
 */
export default function sortedMergeLeftAntiJoin (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return a;
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
            r.unshift(aDatum);
            aVal = isUndefined(aDatum = aSorted.pop(), aAccessor);
        } else if (aVal < bVal) {
            bVal = isUndefined(bDatum = bSorted.pop(), bAccessor);
        } else {
            aVal = isUndefined(aDatum = aSorted.pop(), aAccessor);
        }
    }
    if (aDatum) {
        r.unshift(aDatum);
    }
    return aSorted.concat(r);
}
