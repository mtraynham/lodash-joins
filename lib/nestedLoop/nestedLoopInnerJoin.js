import assign from 'lodash/object/assign';
import reduceRight from 'lodash/collection/reduceRight';

/**
 * Nested loop inner join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
export default function nestedLoopInnerJoin (a, aAccessor, b, bAccessor) {
    let val,
        cval;
    return reduceRight(a, (previous, datum) => {
        val = aAccessor(datum);
        return reduceRight(b, (oPrevious, oDatum) => {
            cval = bAccessor(oDatum);
            if (val <= cval && val >= cval) {
                oPrevious.unshift(assign({}, datum, oDatum));
            }
            return oPrevious;
        }, []).concat(previous);
    }, []);
}
