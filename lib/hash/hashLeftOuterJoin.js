import assign from 'lodash/assign';
import filter from 'lodash/filter';
import flatten from 'lodash/flatten';
import groupBy from 'lodash/groupBy';
import has from 'lodash/has';
import map from 'lodash/map';
import reduceRight from 'lodash/reduceRight';
import values from 'lodash/values';

/**
 * Hash left outer join
 * @param  {Array<Object>} a
 * @param  {Function} aAccessor
 * @param  {Array<Object>} b
 * @param  {Function} bAccessor
 * @return {Array<Object>}
 */
export default function hashLeftOuterJoin (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return a;
    }
    let index,
        value;
    if (a.length < b.length) {
        const seen = {};
        index = groupBy(a, aAccessor);
        return reduceRight(b, (previous, datum) => {
            seen[value = bAccessor(datum)] = true;
            if (has(index, value)) {
                return map(index[value], oDatum => assign({}, oDatum, datum)).concat(previous);
            }
            return previous;
        }, []).concat(flatten(values(filter(index, (val, key) => !has(seen, key)))));
    }
    index = groupBy(b, bAccessor);
    return reduceRight(a, (previous, datum) => {
        value = aAccessor(datum);
        if (has(index, value)) {
            return map(index[value], oDatum => assign({}, datum, oDatum)).concat(previous);
        }
        previous.unshift(datum);
        return previous;
    }, []);
}
