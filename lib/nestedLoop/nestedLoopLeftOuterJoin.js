import {assign, reduceRight} from 'lodash';

/**
 * Nested loop left outer join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
export default function nestedLoopLeftOuterJoin (a, aAccessor, b, bAccessor) {
    let val,
        cval,
        tmpLength;
    return reduceRight(a, (previous, datum) => {
        val = aAccessor(datum);
        tmpLength = previous.length;
        previous = reduceRight(b, (oPrevious, oDatum) => {
            cval = bAccessor(oDatum);
            if (val <= cval && val >= cval) {
                oPrevious.unshift(assign({}, datum, oDatum));
            }
            return oPrevious;
        }, []).concat(previous);
        if (tmpLength === previous.length) {
            previous.unshift(datum);
        }
        return previous;
    }, []);
}
