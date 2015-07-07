import every from 'lodash/collection/every';
import filter from 'lodash/collection/filter';

/**
 * Nested loop left anti join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
export default function nestedLoopLeftAntiJoin (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return a;
    }
    let value,
        otherValue;
    return filter(a, (aDatum) => {
        value = aAccessor(aDatum);
        return every(b, (bDatum) => {
            otherValue = bAccessor(bDatum);
            return !(value <= otherValue && value >= otherValue);
        });
    });
}
