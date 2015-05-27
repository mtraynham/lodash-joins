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
    let idx,
        val;
    if (a.length < b.length) {
        let markedVals = {};
        idx = groupBy(a, aAccessor);
        return reduceRight(b, (previous, datum) => {
            markedVals[val = bAccessor(datum)] = true;
            if (has(idx, val)) {
                return map(idx[val], (oDatum) =>
                    assign({}, oDatum, datum)
                ).concat(previous);
            }
            return previous;
        }, []).concat(flatten(values(filter(idx, (value, key) => !has(markedVals, key)))));
    } else {
        idx = groupBy(b, bAccessor);
        return reduceRight(a, (previous, datum) => {
            if (has(idx, (val = aAccessor(datum)))) {
                return map(idx[val], (oDatum) =>
                    assign({}, datum, oDatum)
                ).concat(previous);
            }
            previous.unshift(datum);
            return previous;
        }, []);
    }
}
