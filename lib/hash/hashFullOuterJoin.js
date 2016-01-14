import assign from 'lodash/assign';
import filter from 'lodash/filter';
import flatten from 'lodash/flatten';
import groupBy from 'lodash/groupBy';
import has from 'lodash/has';
import map from 'lodash/map';
import reduceRight from 'lodash/reduceRight';
import values from 'lodash/values';

/**
 * Hash full outer join
 *
 * @param  {Object[]} a
 * @param  {Function} aAccessor
 * @param  {Object[]} b
 * @param  {Function} bAccessor
 * @return {Object[]}
 */
export default function hashFullOuterJoin (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return a.concat(b);
    }
    let seen = {},
        index,
        result,
        value;
    if (a.length < b.length) {
        index = groupBy(a, aAccessor);
        result = reduceRight(b, (previous, bDatum) => {
            seen[value = bAccessor(bDatum)] = true;
            if (has(index, value)) {
                return map(index[value], (aDatum) => assign({}, aDatum, bDatum)).concat(previous);
            }
            previous.unshift(bDatum);
            return previous;
        }, []);
    } else {
        index = groupBy(b, bAccessor);
        result = reduceRight(a, (previous, aDatum) => {
            seen[value = aAccessor(aDatum)] = true;
            if (has(index, value)) {
                return map(index[value], (bDatum) => assign({}, aDatum, bDatum)).concat(previous);
            }
            previous.unshift(aDatum);
            return previous;
        }, []);
    }
    return result.concat(flatten(values(filter(index, (val, key) => !has(seen, key)))));
}
