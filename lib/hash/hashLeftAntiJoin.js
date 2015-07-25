import filter from 'lodash/collection/filter';
import has from 'lodash/object/has';
import indexBy from 'lodash/collection/indexBy';

/**
 * Hash left anti join
 * @param  {Object[]} a
 * @param  {Function} aAccessor
 * @param  {Object[]} b
 * @param  {Function} bAccessor
 * @return {Object[]}
 */
export default function hashLeftAntiJoin (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return a;
    }
    let index = indexBy(b, bAccessor);
    return filter(a, (aDatum) => !has(index, aAccessor(aDatum)));
}
