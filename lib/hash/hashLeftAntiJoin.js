import filter from 'lodash/filter';
import has from 'lodash/has';
import keyBy from 'lodash/keyBy';

/**
 * Hash left anti join
 * @param  {Array<Object>} a
 * @param  {AccessorFunction} aAccessor
 * @param  {Array<Object>} b
 * @param  {AccessorFunction} bAccessor
 * @return {Array<Object>}
 */
export default function hashLeftAntiJoin (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return a;
    }
    const index = keyBy(b, bAccessor);
    return filter(a, aDatum => !has(index, aAccessor(aDatum)));
}
