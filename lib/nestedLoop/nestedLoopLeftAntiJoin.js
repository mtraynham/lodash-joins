import {every, filter} from 'lodash';

/**
 * Nested loop left anti join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
export default function nestedLoopLeftAntiJoin (a, aAccessor, b, bAccessor) {
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
