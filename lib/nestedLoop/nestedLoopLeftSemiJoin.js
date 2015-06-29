import {filter, some} from 'lodash';

/**
 * Nested loop left semi join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
export default function nestedLoopLeftSemiJoin (a, aAccessor, b, bAccessor) {
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
