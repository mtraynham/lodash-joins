import every from 'lodash/every';
import filter from 'lodash/filter';

/**
 * Nested loop left anti join
 * @param  {Array<Object>} a
 * @param  {Function} aAccessor
 * @param  {Array<Object>} b
 * @param  {Function} bAccessor
 * @return {Array<Object>}
 */
export default function nestedLoopLeftAntiJoin (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return a;
    }
    let value,
        otherValue;
    return filter(a, aDatum => {
        value = aAccessor(aDatum);
        return every(b, bDatum => {
            otherValue = bAccessor(bDatum);
            return !(value <= otherValue && value >= otherValue);
        });
    });
}
