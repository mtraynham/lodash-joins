import assign from 'lodash/object/assign';
import groupBy from 'lodash/collection/groupBy';
import has from 'lodash/object/has';
import map from 'lodash/collection/map';
import reduceRight from 'lodash/collection/reduceRight';

/**
 * Hash inner join
 * @param  {Object[]} a
 * @param  {Function} aAccessor
 * @param  {Object[]} b
 * @param  {Function} bAccessor
 * @return {Object[]}
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
                return map(index[value], (aDatum) => assign({}, aDatum, bDatum)).concat(previous);
            }
            return previous;
        }, []);
    } else {
        index = groupBy(b, bAccessor);
        return reduceRight(a, (previous, aDatum) => {
            if (has(index, (value = aAccessor(aDatum)))) {
                return map(index[value], (bDatum) => assign({}, aDatum, bDatum)).concat(previous);
            }
            return previous;
        }, []);
    }
}
