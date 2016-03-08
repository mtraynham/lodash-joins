import filter from 'lodash/filter';
import has from 'lodash/has';
import keyBy from 'lodash/keyBy';

/**
 * Hash left semi join
 * @param  {Array<Object>} a
 * @param  {Function} aAccessor
 * @param  {Array<Object>} b
 * @param  {Function} bAccessor
 * @return {Array<Object>}
 */
export default function hashLeftSemiJoin (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return [];
    }
    let index = keyBy(b, bAccessor);
    return filter(a, aDatum => has(index, aAccessor(aDatum)));
}
