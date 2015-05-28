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
    let val,
        cval;
    return filter(a, (datum) => {
        val = aAccessor(datum);
        return some(b, (oDatum) => {
            cval = bAccessor(oDatum);
            return val <= cval && val >= cval;
        });
    });
}
