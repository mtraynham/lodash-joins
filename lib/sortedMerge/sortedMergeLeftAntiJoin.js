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
    a = sortBy(a, aAccessor);
    b = sortBy(b, bAccessor);
    let r = [],
        aDatum = a.pop(),
        bDatum = b.pop(),
        aVal = aAccessor(aDatum),
        bVal = bAccessor(bDatum);
    while (aDatum && bDatum) {
        if (aVal > bVal) {
            r.unshift(aDatum);
            aVal = isUndefined(aDatum = a.pop(), aAccessor);
        } else if (aVal < bVal) {
            bVal = isUndefined(bDatum = b.pop(), bAccessor);
        } else {
            aVal = isUndefined(aDatum = a.pop(), aAccessor);
        }
    }
    if (aDatum) {
        r.unshift(aDatum);
    }
    return a.concat(r);
}
