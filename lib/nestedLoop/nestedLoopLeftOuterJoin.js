import filter from 'lodash/filter';
import has from 'lodash/has';
import map from 'lodash/map';
import reduceRight from 'lodash/reduceRight';

/**
 * Nested loop left outer join
 * @param  {Array<Object>} a
 * @param  {AccessorFunction} aAccessor
 * @param  {Array<Object>} b
 * @param  {AccessorFunction} bAccessor
 * @param  {MergerFunction} merger
 * @returns {Array<Object>}
 */
export default function nestedLoopLeftOuterJoin (a, aAccessor, b, bAccessor, merger) {
    if (a.length < 1 || b.length < 1) {
        return a;
    }
    if (a.length < b.length) {
        return reduceRight(a, (previous, aDatum) => {
            const value = aAccessor(aDatum),
                tmpLength = previous.length,
                output = reduceRight(b, (oPrevious, bDatum) => {
                    const otherValue = bAccessor(bDatum);
                    if (value <= otherValue && value >= otherValue) {
                        oPrevious.unshift(merger(aDatum, bDatum));
                    }
                    return oPrevious;
                }, []).concat(previous);
            if (tmpLength === output.length) {
                output.unshift(merger(aDatum, null));
            }
            return output;
        }, []);
    }
    const seen = {};
    return reduceRight(b, (previous, bDatum) => {
        const value = bAccessor(bDatum);
        return reduceRight(a, (oPrevious, aDatum, aIndex) => {
            const otherValue = aAccessor(aDatum);
            if (value <= otherValue && value >= otherValue) {
                seen[aIndex] = true;
                oPrevious.unshift(merger(aDatum, bDatum));
            }
            return oPrevious;
        }, []).concat(previous);
    }, []).concat(map(filter(a, (aDatum, aIndex) => !has(seen, aIndex)), aDatum => merger(aDatum, null)));
}
