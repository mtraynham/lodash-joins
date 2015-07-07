import filter from 'lodash/collection/filter';
import has from 'lodash/object/has';
import indexBy from 'lodash/collection/indexBy';

/**
 * Hash left semi join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
export default function hashLeftSemiJoin (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return [];
    }
    let index = indexBy(b, bAccessor);
    return filter(a, (aDatum) => has(index, aAccessor(aDatum)));
}
