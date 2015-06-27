import {filter, has, indexBy} from 'lodash';

/**
 * Hash left semi join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
export default function hashLeftSemiJoin (a, aAccessor, b, bAccessor) {
    let index = indexBy(b, bAccessor);
    return filter(a, (aDatum) => has(index, aAccessor(aDatum)));
}
