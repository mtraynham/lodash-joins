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
    if (a.length < 1 || b.length < 1) {
        return [];
    }
    let value,
        otherValue;
    if (a.length < b.length) {
        return reduceRight(a, (previous, aDatum) => {
            value = aAccessor(aDatum);
            return reduceRight(b, (oPrevious, bDatum) => {
                otherValue = bAccessor(bDatum);
                if (value <= otherValue && value >= otherValue) {
                    oPrevious.unshift(assign({}, aDatum, bDatum));
                }
                return oPrevious;
            }, []).concat(previous);
        }, []);
    } else {
        return reduceRight(b, (previous, bDatum) => {
            value = bAccessor(bDatum);
            return reduceRight(a, (oPrevious, aDatum) => {
                otherValue = aAccessor(aDatum);
                if (value <= otherValue && value >= otherValue) {
                    oPrevious.unshift(assign({}, aDatum, bDatum));
                }
                return oPrevious;
            }, []).concat(previous);
        }, []);
    }
}
