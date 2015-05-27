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
    let val,
        cval;
    return filter(a, (datum) => {
        val = aAccessor(datum);
        return every(b, (oDatum) => {
            cval = bAccessor(oDatum);
            return !(val <= cval && val >= cval);
        });
    });
}
