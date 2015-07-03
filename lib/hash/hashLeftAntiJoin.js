import {filter, has, indexBy} from 'lodash';

/**
 * Hash left anti join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
export default function hashLeftAntiJoin (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return a;
    }
    let index = indexBy(b, bAccessor);
    return filter(a, (aDatum) => !has(index, aAccessor(aDatum)));
}
