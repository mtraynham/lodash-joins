import filter from 'lodash/collection/filter';
import some from 'lodash/collection/some';

/**
 * Nested loop left semi join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
export default function nestedLoopLeftSemiJoin (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return [];
    }
    let value,
        otherValue;
    return filter(a, (aDatum) => {
        value = aAccessor(aDatum);
        return some(b, (bDatum) => {
            otherValue = bAccessor(bDatum);
            return value <= otherValue && value >= otherValue;
        });
    });
}
