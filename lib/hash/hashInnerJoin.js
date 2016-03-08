import assign from 'lodash/assign';
import groupBy from 'lodash/groupBy';
import has from 'lodash/has';
import map from 'lodash/map';
import reduceRight from 'lodash/reduceRight';

/**
 * Hash inner join
 * @param  {Array<Object>} a
 * @param  {Function} aAccessor
 * @param  {Array<Object>} b
 * @param  {Function} bAccessor
 * @return {Array<Object>}
 */
export default function hashInnerJoin (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return [];
    }
    let index,
        value;
    if (a.length < b.length) {
        index = groupBy(a, aAccessor);
        return reduceRight(b, (previous, bDatum) => {
            if (has(index, (value = bAccessor(bDatum)))) {
                return map(index[value], aDatum => assign({}, aDatum, bDatum)).concat(previous);
            }
            return previous;
        }, []);
    }
    index = groupBy(b, bAccessor);
    return reduceRight(a, (previous, aDatum) => {
        if (has(index, (value = aAccessor(aDatum)))) {
            return map(index[value], bDatum => assign({}, aDatum, bDatum)).concat(previous);
        }
        return previous;
    }, []);
}
