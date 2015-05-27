import assign from 'lodash/object/assign';
import filter from 'lodash/collection/filter';
import flatten from 'lodash/array/flatten';
import groupBy from 'lodash/collection/groupBy';
import has from 'lodash/object/has';
import map from 'lodash/collection/map';
import reduceRight from 'lodash/collection/reduceRight';
import values from 'lodash/object/values';

/**
 * Hash full outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
export default function hashFullOuterJoin (a, aAccessor, b, bAccessor) {
    let idx,
        markedVals = {},
        result,
        val;
    if (a.length < b.length) {
        idx = groupBy(a, aAccessor);
        result = reduceRight(b, (previous, datum) => {
            markedVals[val = bAccessor(datum)] = true;
            if (has(idx, val)) {
                return map(idx[val], (oDatum) =>
                    assign({}, oDatum, datum)
                ).concat(previous);
            }
            previous.unshift(datum);
            return previous;
        }, []);
    } else {
        idx = groupBy(b, bAccessor);
        result = reduceRight(a, (previous, datum) => {
            markedVals[val = aAccessor(datum)] = true;
            if (has(idx, val)) {
                return map(idx[val], (oDatum) =>
                    assign({}, datum, oDatum)
                ).concat(previous);
            }
            previous.unshift(datum);
            return previous;
        }, []);
    }
    return result.concat(flatten(values(filter(idx, (value, key) => !has(markedVals, key)))));
}
