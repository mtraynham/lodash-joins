import assign from 'lodash/object/assign';
import groupBy from 'lodash/collection/groupBy';
import has from 'lodash/object/has';
import map from 'lodash/collection/map';
import reduceRight from 'lodash/collection/reduceRight';

/**
 * Hash inner join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
export default function hashInnerJoin (a, aAccessor, b, bAccessor) {
    let idx,
        result,
        val;
    if (a.length < b.length) {
        idx = groupBy(a, aAccessor);
        result = reduceRight(b, (previous, datum) => {
            if (has(idx, (val = bAccessor(datum)))) {
                return map(idx[val], (oDatum) =>
                    assign({}, oDatum, datum)
                ).concat(previous);
            }
            return previous;
        }, []);
    } else {
        idx = groupBy(b, bAccessor);
        result = reduceRight(a, function (previous, datum) {
            if (has(idx, (val = aAccessor(datum)))) {
                return map(idx[val], (oDatum) =>
                    assign({}, datum, oDatum)
                ).concat(previous);
            }
            return previous;
        }, []);
    }
    return result;
}
