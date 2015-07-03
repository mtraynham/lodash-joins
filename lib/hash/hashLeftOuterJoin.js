import {assign, filter, flatten, groupBy, has, map, reduceRight, values} from 'lodash';

/**
 * Hash left outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
export default function hashLeftOuterJoin (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return a;
    }
    let index,
        value;
    if (a.length < b.length) {
        let seen = {};
        index = groupBy(a, aAccessor);
        return reduceRight(b, (previous, datum) => {
            seen[value = bAccessor(datum)] = true;
            if (has(index, value)) {
                return map(index[value], (oDatum) => assign({}, oDatum, datum)).concat(previous);
            }
            return previous;
        }, []).concat(flatten(values(filter(index, (val, key) => !has(seen, key)))));
    } else {
        index = groupBy(b, bAccessor);
        return reduceRight(a, (previous, datum) => {
            if (has(index, (value = aAccessor(datum)))) {
                return map(index[value], (oDatum) => assign({}, datum, oDatum)).concat(previous);
            }
            previous.unshift(datum);
            return previous;
        }, []);
    }
}
