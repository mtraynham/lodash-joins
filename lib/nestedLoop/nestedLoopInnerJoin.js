import reduceRight from 'lodash/reduceRight';

/**
 * Nested loop inner join
 * @param  {Array<Object>} a
 * @param  {AccessorFunction} aAccessor
 * @param  {Array<Object>} b
 * @param  {AccessorFunction} bAccessor
 * @param  {MergerFunction} merger
 * @returns {Array<Object>}
 */
export default function nestedLoopInnerJoin (a, aAccessor, b, bAccessor, merger) {
    if (a.length < 1 || b.length < 1) {
        return [];
    }
    if (a.length < b.length) {
        return reduceRight(a, (previous, aDatum) => {
            const value = aAccessor(aDatum);
            return reduceRight(b, (oPrevious, bDatum) => {
                const otherValue = bAccessor(bDatum);
                if (value <= otherValue && value >= otherValue) {
                    oPrevious.unshift(merger(aDatum, bDatum));
                }
                return oPrevious;
            }, []).concat(previous);
        }, []);
    }
    return reduceRight(b, (previous, bDatum) => {
        const value = bAccessor(bDatum);
        return reduceRight(a, (oPrevious, aDatum) => {
            const otherValue = aAccessor(aDatum);
            if (value <= otherValue && value >= otherValue) {
                oPrevious.unshift(merger(aDatum, bDatum));
            }
            return oPrevious;
        }, []).concat(previous);
    }, []);
}
