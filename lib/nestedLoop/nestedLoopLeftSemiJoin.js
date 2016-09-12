import filter from 'lodash/filter';
import some from 'lodash/some';

/**
 * Nested loop left semi join
 * @param  {Array<Object>} a
 * @param  {AccessorFunction} aAccessor
 * @param  {Array<Object>} b
 * @param  {AccessorFunction} bAccessor
 * @return {Array<Object>}
 */
export default function nestedLoopLeftSemiJoin (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return [];
    }
    return filter(a, (aDatum) => {
        const value = aAccessor(aDatum);
        return some(b, (bDatum) => {
            const otherValue = bAccessor(bDatum);
            return value <= otherValue && value >= otherValue;
        });
    });
}
