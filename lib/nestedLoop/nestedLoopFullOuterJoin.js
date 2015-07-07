import assign from 'lodash/object/assign';
import filter from 'lodash/collection/filter';
import has from 'lodash/object/has';
import reduceRight from 'lodash/collection/reduceRight';

/**
 * Nested loop left semi join
 * @param  {*[]} a
 * @param  {Function} aAccessor
 * @param  {*[]} b
 * @param  {Function} bAccessor
 * @return {*[]}
 */
export default function nestedLoopFullOuterJoin (a, aAccessor, b, bAccessor) {
    if (a.length < 1 || b.length < 1) {
        return a.concat(b);
    }
    let value,
        otherValue,
        seen = {},
        tmpLength;
    if (a.length < b.length) {
        return reduceRight(a, (previous, aDatum) => {
            value = aAccessor(aDatum);
            tmpLength = previous.length;
            previous = reduceRight(b, (oPrevious, bDatum, bIndex) => {
                otherValue = bAccessor(bDatum);
                if (value <= otherValue && value >= otherValue) {
                    seen[bIndex] = true;
                    oPrevious.unshift(assign({}, aDatum, bDatum));
                }
                return oPrevious;
            }, []).concat(previous);
            if (tmpLength === previous.length) {
                previous.unshift(aDatum);
            }
            return previous;
        }, []).concat(filter(b, (bDatum, bIndex) => !has(seen, bIndex)));
    } else {
        return reduceRight(b, (previous, bDatum) => {
            value = bAccessor(bDatum);
            tmpLength = previous.length;
            previous = reduceRight(a, (oPrevious, aDatum, aIndex) => {
                otherValue = aAccessor(aDatum);
                if (value <= otherValue && value >= otherValue) {
                    seen[aIndex] = true;
                    oPrevious.unshift(assign({}, aDatum, bDatum));
                }
                return oPrevious;
            }, []).concat(previous);
            if (tmpLength === previous.length) {
                previous.unshift(bDatum);
            }
            return previous;
        }, []).concat(filter(a, (aDatum, aIndex) => !has(seen, aIndex)));
    }
}
