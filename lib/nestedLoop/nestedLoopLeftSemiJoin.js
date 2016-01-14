import filter from 'lodash/filter';
import some from 'lodash/some';

/**
 * Nested loop left semi join
 *
 * @param  {Object[]} a
 * @param  {Function} aAccessor
 * @param  {Object[]} b
 * @param  {Function} bAccessor
 * @return {Object[]}
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
