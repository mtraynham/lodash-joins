import filter from 'lodash/filter';
import flatten from 'lodash/flatten';
import groupBy from 'lodash/groupBy';
import has from 'lodash/has';
import map from 'lodash/map';
import reduceRight from 'lodash/reduceRight';
import values from 'lodash/values';

/**
 * Hash full outer join
 * @param  {Array<Object>} a
 * @param  {AccessorFunction} aAccessor
 * @param  {Array<Object>} b
 * @param  {AccessorFunction} bAccessor
 * @param  {MergerFunction} merger
 * @returns {Array<Object>}
 */
export default function hashFullOuterJoin (a, aAccessor, b, bAccessor, merger) {
    if (a.length < 1 || b.length < 1) {
        return a.concat(b);
    }
    const seen = {};
    let index,
        result,
        value;
    if (a.length < b.length) {
        index = groupBy(a, aAccessor);
        result = reduceRight(b, (previous, bDatum) => {
            seen[value = bAccessor(bDatum)] = true;
            if (has(index, value)) {
                return map(index[value], aDatum => merger(aDatum, bDatum)).concat(previous);
            }
            previous.unshift(merger(null, bDatum));
            return previous;
        }, []);
        return result.concat(map(flatten(values(filter(index, (val, key) => !has(seen, key)))), aDatum => merger(aDatum, null)));
    }
    index = groupBy(b, bAccessor);
    result = reduceRight(a, (previous, aDatum) => {
        seen[value = aAccessor(aDatum)] = true;
        if (has(index, value)) {
            return map(index[value], bDatum => merger(aDatum, bDatum)).concat(previous);
        }
        previous.unshift(merger(aDatum, null));
        return previous;
    }, []);
    return result.concat(map(flatten(values(filter(index, (val, key) => !has(seen, key)))), bDatum => merger(null, bDatum)));
}
