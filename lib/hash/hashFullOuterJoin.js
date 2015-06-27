import {assign, filter, flatten, groupBy, has, map, reduceRight, values} from 'lodash';

/**
 * Hash full outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
export default function hashFullOuterJoin (a, aAccessor, b, bAccessor) {
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
