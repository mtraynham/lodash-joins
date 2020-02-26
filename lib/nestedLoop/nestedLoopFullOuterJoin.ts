import filter from 'lodash/filter';
import has from 'lodash/has';
import map from 'lodash/map';
import reduceRight from 'lodash/reduceRight';

/**
 * Nested loop left semi join
 * @param  {Array<Object>} a
 * @param  {AccessorFunction} aAccessor
 * @param  {Array<Object>} b
 * @param  {AccessorFunction} bAccessor
 * @param  {MergerFunction} merger
 * @returns {Array<Object>}
 */
export default function nestedLoopFullOuterJoin (a, aAccessor, b, bAccessor, merger) {
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
                    oPrevious.unshift(merger(aDatum, bDatum));
                }
                return oPrevious;
            }, []).concat(previous);
            if (tmpLength === output.length) {
                output.unshift(merger(aDatum, null));
            }
            return output;
        }, []).concat(map(filter(b, (bDatum, bIndex) => !has(seen, bIndex)), bDatum => merger(null, bDatum)));
    }
    return reduceRight(b, (previous, bDatum) => {
        value = bAccessor(bDatum);
        tmpLength = previous.length;
        output = reduceRight(a, (oPrevious, aDatum, aIndex) => {
            otherValue = aAccessor(aDatum);
            if (value <= otherValue && value >= otherValue) {
                seen[aIndex] = true;
                oPrevious.unshift(merger(aDatum, bDatum));
            }
            return oPrevious;
        }, []).concat(previous);
        if (tmpLength === output.length) {
            output.unshift(merger(null, bDatum));
        }
        return output;
    }, []).concat(map(filter(a, (aDatum, aIndex) => !has(seen, aIndex)), aDatum => merger(aDatum, null)));
}
