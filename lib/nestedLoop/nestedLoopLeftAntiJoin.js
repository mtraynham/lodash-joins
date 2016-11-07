import every from 'lodash/every';
import filter from 'lodash/filter';

/**
 * Nested loop left anti join
 * @param  {Array<Object>} a
 * @param  {AccessorFunction} aAccessor
 * @param  {Array<Object>} b
 * @param  {AccessorFunction} bAccessor
 * @returns {Array<Object>}
 */
export default function nestedLoopLeftAntiJoin (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return a;
    }
    return filter(a, (aDatum) => {
        const value = aAccessor(aDatum);
        return every(b, (bDatum) => {
            const otherValue = bAccessor(bDatum);
            return !(value <= otherValue && value >= otherValue);
        });
    });
}
