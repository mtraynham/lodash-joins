import {assign, groupBy, has, map, reduceRight} from 'lodash';

/**
 * Hash inner join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
export default function hashInnerJoin (a, aAccessor, b, bAccessor) {
    let index,
        result,
        value;
    if (a.length < b.length) {
        index = groupBy(a, aAccessor);
        result = reduceRight(b, (previous, bDatum) => {
            if (has(index, (value = bAccessor(bDatum)))) {
                return map(index[value], (aDatum) => assign({}, aDatum, bDatum)).concat(previous);
            }
            return previous;
        }, []);
    } else {
        index = groupBy(b, bAccessor);
        result = reduceRight(a, function (previous, aDatum) {
            if (has(index, (value = aAccessor(aDatum)))) {
                return map(index[value], (bDatum) => assign({}, aDatum, bDatum)).concat(previous);
            }
            return previous;
        }, []);
    }
    return result;
}
