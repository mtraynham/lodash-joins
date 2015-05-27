import filter from 'lodash/collection/filter';
import has from 'lodash/object/has';
import indexBy from 'lodash/collection/indexBy';

/**
 * Hash left anti join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
export default function hashLeftAntiJoin (a, aAccessor, b, bAccessor) {
    let idx = indexBy(b, bAccessor);
    return filter(a, (datum) => !has(idx, aAccessor(datum)));
}
