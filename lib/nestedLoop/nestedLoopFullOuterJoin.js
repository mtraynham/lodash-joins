import assign from 'lodash/assign';
import filter from 'lodash/filter';
import has from 'lodash/has';
import reduceRight from 'lodash/reduceRight';

/**
 * Nested loop left semi join
 * @param  {Array<Object>} a
 * @param  {AccessorFunction} aAccessor
 * @param  {Array<Object>} b
 * @param  {AccessorFunction} bAccessor
 * @returns {Array<Object>}
 */
export default function nestedLoopFullOuterJoin (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return a.concat(b);
    }
    const seen = {};
    let value,
        otherValue,
        tmpLength,
        output;
    if (a.length < b.length) {
        return reduceRight(a, (previous, aDatum) => {
            value = aAccessor(aDatum);
            tmpLength = previous.length;
            output = reduceRight(b, (oPrevious, bDatum, bIndex) => {
                otherValue = bAccessor(bDatum);
                if (value <= otherValue && value >= otherValue) {
                    seen[bIndex] = true;
                    oPrevious.unshift(assign({}, aDatum, bDatum));
                }
                return oPrevious;
            }, []).concat(previous);
            if (tmpLength === output.length) {
                output.unshift(aDatum);
            }
            return output;
        }, []).concat(filter(b, (bDatum, bIndex) => !has(seen, bIndex)));
    }
    return reduceRight(b, (previous, bDatum) => {
        value = bAccessor(bDatum);
        tmpLength = previous.length;
        output = reduceRight(a, (oPrevious, aDatum, aIndex) => {
            otherValue = aAccessor(aDatum);
            if (value <= otherValue && value >= otherValue) {
                seen[aIndex] = true;
                oPrevious.unshift(assign({}, aDatum, bDatum));
            }
            return oPrevious;
        }, []).concat(previous);
        if (tmpLength === output.length) {
            output.unshift(bDatum);
        }
        return output;
    }, []).concat(filter(a, (aDatum, aIndex) => !has(seen, aIndex)));
}
